import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FileService } from "@shared/services/file.service";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { Category } from "./shared/models/category.model";
import { PlaylistElement } from "./shared/models/playlist-element.model";
import {
  SoundboardButton,
  Tag,
  UploadedFileApiResponse,
} from "./shared/models/soundboard-button.model";
import { SoundMode } from "./shared/models/soundmode.enum";

@Injectable()
export class SoundboardService {
  public audioByButtonfileName: { [fileName: string]: AudioBuffer } = {};
  public master: boolean;

  public get cachedButtons(): SoundboardButton[] {
    return this._cachedButtons;
  }

  public get soundMode(): SoundMode {
    return this._soundMode;
  }

  public set soundMode(soundMode: SoundMode) {
    this._soundMode = soundMode;
    if (this._soundMode !== SoundMode.QUEUE) {
      if (this._playlist && this._playlist.length > 0) {
        console.log(
          `Clearing playlist containing ${this._playlist.map((e: PlaylistElement) => e.fileName).join(", ")}`,
        );
      }
      this._playlist = [];
    }
  }

  private _cachedButtons: SoundboardButton[] = [];
  private _soundMode: SoundMode;
  private _audioContext: AudioContext;
  private _playlist: PlaylistElement[] = [];

  constructor(
    private http: HttpClient,
    private fileService: FileService,
  ) {
    this.soundMode =
      (Number(localStorage.getItem("soundMode")) as SoundMode) ||
      SoundMode.OVERRIDE;
    this._audioContext = new AudioContext();
  }

  // HTTP REQUESTS
  public getAllButtons(): Observable<SoundboardButton[]> {
    return this.http.get("/button/all").pipe(
      take(1),
      map((buttons: SoundboardButton[]) => {
        return (this._cachedButtons = buttons);
      }),
    );
  }

  public getMediaByfileName(fileName: string): Observable<ArrayBuffer> {
    return this.fileService
      .downloadFileByFileName(fileName, "response", "arraybuffer")
      .pipe(
        take(1),
        map((data: HttpResponse<ArrayBuffer>) => data.body),
      );
  }

  public createButton(
    button: SoundboardButton,
    file: File,
  ): Observable<SoundboardButton> {
    const formData: FormData = new FormData();

    formData.append("file", file);

    return this.fileService.uploadFile(formData).pipe(
      take(1),
      switchMap((uploadedFile: UploadedFileApiResponse) => {
        button.fileName = uploadedFile.fileName;
        return this.http.post("/button", button);
      }),
      map((createdButton: SoundboardButton) => createdButton),
    );
  }

  public updateButton(
    button: SoundboardButton,
    file?: File,
  ): Observable<SoundboardButton> {
    if (file) {
      const formData: FormData = new FormData();

      formData.append("file", file);

      return this.fileService.uploadFile(formData).pipe(
        take(1),
        switchMap((uploadedFile: UploadedFileApiResponse) => {
          button.fileName = uploadedFile.fileName;
          return this.http.patch(`/button/${button.id}`, button);
        }),
        map((createdButton: SoundboardButton) => createdButton),
      );
    }

    return this.http.patch(
      `/button/${button.id}`,
      button,
    ) as Observable<SoundboardButton>;
  }

  public deleteButtonById(id: string): Observable<SoundboardButton> {
    return this.http.delete(`/button/${id}`) as Observable<SoundboardButton>;
  }

  public createTags(tags: Tag[]): Observable<Tag[]> {
    if (!tags?.length) {
      return of([]);
    }

    return this.http.post("/tag", tags) as Observable<Tag[]>;
  }

  public getTagsByNames(names: string[]): Observable<Tag[]> {
    return this.http.get<Tag[]>(`/tag?names=${names.join(",")}`);
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>("/category/all");
  }

  public async computeGain(fileOrBuffer: File | AudioBuffer): Promise<number> {
    let buffer: AudioBuffer;

    if (fileOrBuffer instanceof File) {
      console.log(`Computing gain for file ${fileOrBuffer.name}`);

      const data = await fileOrBuffer.arrayBuffer();
      const audioContext = new AudioContext();

      buffer = await audioContext.decodeAudioData(data);
    } else {
      buffer = fileOrBuffer;
    }

    return new Promise((resolve) => {
      const { length, sampleRate } = buffer;
      const offlineAudioContext = new OfflineAudioContext({
        length,
        sampleRate,
      });
      const offlineSource = new AudioBufferSourceNode(offlineAudioContext, {
        buffer,
      });
      const analyser = offlineAudioContext.createAnalyser();
      const renderQuantumInSeconds = 128 / sampleRate;
      const durationInSeconds = length / sampleRate;
      const frequencies = new Uint8Array(analyser.frequencyBinCount);
      let volume: number = 0;

      offlineSource.connect(analyser);
      offlineSource.start();

      const analyze = (index: number = 1) => {
        const suspendTime = renderQuantumInSeconds * index;

        if (suspendTime < durationInSeconds) {
          offlineAudioContext.suspend(suspendTime).then(() => {
            analyser.getByteFrequencyData(frequencies);

            let sum = 0;
            for (const amplitude of frequencies) {
              sum += amplitude * amplitude;
            }

            const currentVolume = Math.sqrt(sum / frequencies.length);

            if (currentVolume > volume) {
              volume = currentVolume;
            }

            analyze(index + 1);
          });
        }

        offlineAudioContext[index === 1 ? "startRendering" : "resume"]();
      };

      analyze();

      offlineAudioContext.oncomplete = () => {
        const ratio = 100 / volume;

        console.log(`Computing ended with value ${ratio}`);
        resolve(ratio);
      };
    });
  }

  // METHODS
  public async playAudio(button: SoundboardButton): Promise<void> {
    if (this.soundMode === SoundMode.OVERRIDE && this._audioContext) {
      await this._audioContext
        .close()
        .then(() => console.log("Audio context closed"));
      this._audioContext = new AudioContext();
    }

    const { fileName, gain } = button;

    if (!this.audioByButtonfileName[fileName]) {
      this.getMediaByfileName(fileName)
        .pipe(take(1))
        .subscribe(async (data: ArrayBuffer) => {
          console.log(`Created audio for file ${fileName}`);

          this.audioByButtonfileName[fileName] =
            await this._audioContext.decodeAudioData(data);

          if (!button.gain) {
            button.gain = await this.computeGain(
              this.audioByButtonfileName[fileName],
            );

            this.updateButton(button).pipe(take(1)).subscribe();
          }

          this._triggerPlay({
            audioBuffer: this.audioByButtonfileName[fileName],
            fileName,
            gain: button.gain,
          });
        });
    } else {
      console.log(`Using cached audio for file ${fileName}`);
      this._triggerPlay({
        audioBuffer: this.audioByButtonfileName[fileName],
        fileName,
        gain,
      });
    }
  }

  private async _triggerPlay(playlistElement: PlaylistElement): Promise<void> {
    this._playlist.push(playlistElement);

    if (this.soundMode === SoundMode.QUEUE) {
      if (this._playlist.length > 1) return;
    }

    this._playCachedAudio(playlistElement);
  }

  private _playCachedAudio(playlistElement: PlaylistElement): void {
    const source: AudioBufferSourceNode =
      this._audioContext.createBufferSource();

    const gainNode = this._audioContext.createGain();

    source.buffer = playlistElement.audioBuffer;
    gainNode.connect(this._audioContext.destination);
    gainNode.gain.value = this.master ? playlistElement.gain : 1;
    source.connect(gainNode);
    source.start();
    console.log(`Playing ${playlistElement.fileName}`);

    source.onended = () => {
      if (this.soundMode === SoundMode.LOOP) {
        return this._playCachedAudio(playlistElement);
      }

      this._playlist = this._playlist.filter(
        (element: PlaylistElement) => element !== playlistElement,
      );
      if (this.soundMode === SoundMode.QUEUE && this._playlist.length > 0) {
        this._playCachedAudio(this._playlist[0]);
      }
    };
  }
}
