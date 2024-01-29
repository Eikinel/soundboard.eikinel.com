import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  SoundboardButton,
  UploadedFileApiResponse,
} from "@core/models/buttons.model";
import { PlaylistElement } from "@core/models/playlist-element.model";
import { Tag } from "@core/models/soundboard-button.model";
import { SoundMode } from "@core/models/soundmode.enum";
import { FileService } from "@shared/services/file.service";
import { Observable, of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

@Injectable()
export class SoundboardService {
  public audioByButtonFilename: { [filename: string]: AudioBuffer } = {};

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
          `Clearing playlist containing ${this._playlist.map((e: PlaylistElement) => e.filename).join(", ")}`,
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

  public getMediaByFileName(fileName: string): Observable<ArrayBuffer> {
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

    return this.http.patch<SoundboardButton>(`/button/${button.id}`, button);
  }

  public deleteButtonById(id: string): Observable<SoundboardButton> {
    return this.http.delete<SoundboardButton>(`/button/${id}`);
  }

  public createTags(tags: Tag[]): Observable<Tag[]> {
    if (!tags?.length) {
      return of([]);
    }

    return this.http.post<Tag[]>("/tag", tags);
  }

  public getTagsByNames(names: string[]): Observable<Tag[]> {
    return this.http.get<Tag[]>(`/tag?names=${names.join(",")}`);
  }

  // METHODS
  public async playAudio(filename: string): Promise<void> {
    if (this.soundMode === SoundMode.OVERRIDE && this._audioContext) {
      await this._audioContext
        .close()
        .then(() => console.log("Audio context closed"));
      this._audioContext = new AudioContext();
    }

    if (!this.audioByButtonFilename[filename]) {
      this.getMediaByFileName(filename)
        .pipe(take(1))
        .subscribe(async (data: ArrayBuffer) => {
          console.log(`Created audio for file ${filename}`);
          this.audioByButtonFilename[filename] =
            await this._audioContext.decodeAudioData(data);
          this._triggerPlay({
            audioBuffer: this.audioByButtonFilename[filename],
            filename,
          });
        });
    } else {
      console.log(`Using cached audio for file ${filename}`);
      this._triggerPlay({
        audioBuffer: this.audioByButtonFilename[filename],
        filename,
      });
    }
  }

  private _triggerPlay(playlistElement: PlaylistElement): void {
    this._playlist.push(playlistElement);

    if (this.soundMode === SoundMode.QUEUE) {
      if (this._playlist.length > 1) return;
    }

    this._playCachedAudio(playlistElement);
  }

  private _playCachedAudio(playlistElement: PlaylistElement): void {
    const source: AudioBufferSourceNode =
      this._audioContext.createBufferSource();

    source.buffer = playlistElement.audioBuffer;
    source.connect(this._audioContext.destination);
    source.start();
    console.log(`Playing ${playlistElement.filename}`);

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
