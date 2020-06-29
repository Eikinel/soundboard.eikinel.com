import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { map, switchMap, take } from "rxjs/operators";
import { SoundboardButton, UploadedFileApiResponse } from "../models/buttons.model";
import { FileService } from "../services/file.service";

@Injectable()
export class SoundboardService {
    public audioByButtonFilename: { [filename: string]: AudioBuffer } = {};

    private _audioContext: AudioContext;

    constructor(
        private http: HttpClient,
        private fileService: FileService) {
        this._audioContext = new AudioContext();
    }


    // HTTP REQUESTS
    public getAllButtons(): Observable<SoundboardButton[]> {
        return this.http.get('/button/all')
            .pipe(
                take(1),
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

        formData.append(file.name, file);

        return this.fileService.uploadFile(formData)
            .pipe(
                take(1),
                switchMap((uploadedFile: UploadedFileApiResponse) => {
                    button.fileName = uploadedFile.fileName;
                    return this.http.post('/button', { button });
                }),
                map((createdButton: SoundboardButton) => createdButton)
            );
    }


    // METHODS
    public playAudio(filename: string): void {
        if (!this.audioByButtonFilename[filename]) {
            this.getMediaByFileName(filename)
                .pipe(take(1))
                .subscribe(async (data: ArrayBuffer) => {
                    console.log(`Created audio for file ${filename}`);
                    this.audioByButtonFilename[filename] = await this._audioContext.decodeAudioData(data);
                    this._playCachedAudio(this.audioByButtonFilename[filename], filename);
                });
        } else {
            console.log(`Using cached audio for file ${filename}`);
            this._playCachedAudio(this.audioByButtonFilename[filename], filename);
        }
    }

    private _playCachedAudio(audioBuffer: AudioBuffer, filename: string): void {
        const source: AudioBufferSourceNode = this._audioContext.createBufferSource();

        source.buffer = audioBuffer;
        source.connect(this._audioContext.destination);
        source.start();

        console.log(`Played button with filename ${filename}`);
    }
}