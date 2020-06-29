import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";

@Injectable()
export class SoundboardService {
    public audioByButtonFilename: { [filename: string]: HTMLAudioElement } = {};

    constructor(private http: HttpClient) {
    }

    public sayHello(): Observable<string> {
        return this.http.get('/hello')
            .pipe(
                take(1),
                map((hello: string) => hello)
            );
    }

    public playAudio(filename: string): void {
        const useAudioCache: boolean = Boolean(JSON.parse(
            localStorage.getItem('useAudioCache') || 'true'));

        if (!this.audioByButtonFilename[filename] || !useAudioCache) {
            console.log(`Created audio for file ${filename}`);
            this.audioByButtonFilename[filename] = new Audio(`assets/sounds/${filename}`);
            this.audioByButtonFilename[filename].load();
        } else {
            console.log(`Using cached audio for file ${filename}`);
        }

        this.audioByButtonFilename[filename].play()
            .then(() => console.log(`Played button with filename ${filename}`))
            .catch((error: string) => console.error(error));
    }
}