import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map, switchMap, take } from "rxjs/operators";
import { SoundboardButton, UploadedFileApiResponse } from "./models/buttons.model";
import { FileService } from "../services/file.service";
import { SoundMode } from "./models/soundmode.enum";
import { PlaylistElement } from "./models/playlist-element.model";

@Injectable()
export class SoundboardService {
    public audioByButtonFilename: { [filename: string]: AudioBuffer } = {};
    public get soundMode(): SoundMode {
        return this._soundMode;
    }
    public set soundMode(soundMode: SoundMode) {
        this._soundMode = soundMode;
        if (this._soundMode !== SoundMode.QUEUE) {
            if (this._playlist && this._playlist.length > 0) {
                console.log(`Clearing playlist containing ${this._playlist.map((e: PlaylistElement) => e.filename).join(', ')}`);
            }
            this._playlist = [];
        }
    }

    private _soundMode: SoundMode;
    private _audioContext: AudioContext;
    private _playlist: PlaylistElement[];

    constructor(
        private http: HttpClient,
        private fileService: FileService) {
        this.soundMode = Number(localStorage.getItem('soundMode')) as SoundMode || SoundMode.OVERRIDE;
        this._audioContext = new AudioContext();
        this._playlist = [];
    }


    // HTTP REQUESTS
    public getAllButtons(): Observable<SoundboardButton[]> {
        return this.http.get('/button/all')
            .pipe(
                map((buttons: SoundboardButton[]) => buttons)
            );
    }

    public getMediaByFileName(fileName: string): Observable<ArrayBuffer> {
        return this.fileService.downloadFileByFileName(fileName, 'response', 'arraybuffer')
            .pipe(
                take(1),
                map((data: HttpResponse<ArrayBuffer>) => data.body)
            );
    }

    public createButton(button: SoundboardButton, file: File): Observable<SoundboardButton> {
        const formData: FormData = new FormData();

        formData.append('file', file);

        return this.fileService.uploadFile(formData)
            .pipe(
                take(1),
                switchMap((uploadedFile: UploadedFileApiResponse) => {
                    button.fileName = uploadedFile.fileName;
                    return this.http.post('/button', button);
                }),
                map((createdButton: SoundboardButton) => createdButton)
            );
    }


    // METHODS
    public async playAudio(filename: string): Promise<void> {
        if (this.soundMode === SoundMode.OVERRIDE && this._audioContext) {
            await this._audioContext.close()
                .then(() => console.log("Audio context closed"));
            this._audioContext = new AudioContext();
        }

        if (!this.audioByButtonFilename[filename]) {
            this.getMediaByFileName(filename)
                .pipe(take(1))
                .subscribe(async (data: ArrayBuffer) => {
                    console.log(`Created audio for file ${filename}`);
                    this.audioByButtonFilename[filename] = await this._audioContext.decodeAudioData(data);
                    this._triggerPlay({ audioBuffer: this.audioByButtonFilename[filename], filename });
                });
        } else {
            console.log(`Using cached audio for file ${filename}`);
            this._triggerPlay({ audioBuffer: this.audioByButtonFilename[filename], filename });
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
        const source: AudioBufferSourceNode = this._audioContext.createBufferSource();

        source.buffer = playlistElement.audioBuffer;
        source.connect(this._audioContext.destination);
        source.start();
        console.log(`Playing ${playlistElement.filename}`);

        source.onended = () => {
            if (this.soundMode === SoundMode.LOOP) {
                return this._playCachedAudio(playlistElement);
            }

            this._playlist = this._playlist.filter((element: PlaylistElement) => element !== playlistElement);
            if (this.soundMode === SoundMode.QUEUE && this._playlist.length > 0) {
                this._playCachedAudio(this._playlist[0]);
            }
        };
    }
}