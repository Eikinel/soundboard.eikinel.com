import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";
import { SoundMode } from "./shared/models/soundmode.enum";
let SoundboardService = class SoundboardService {
    get cachedButtons() {
        return this._cachedButtons;
    }
    get soundMode() {
        return this._soundMode;
    }
    set soundMode(soundMode) {
        this._soundMode = soundMode;
        if (this._soundMode !== SoundMode.QUEUE) {
            if (this._playlist && this._playlist.length > 0) {
                console.log(`Clearing playlist containing ${this._playlist.map((e) => e.filename).join(", ")}`);
            }
            this._playlist = [];
        }
    }
    constructor(http, fileService) {
        this.http = http;
        this.fileService = fileService;
        this.audioByButtonFilename = {};
        this._cachedButtons = [];
        this._playlist = [];
        this.soundMode =
            Number(localStorage.getItem("soundMode")) ||
                SoundMode.OVERRIDE;
        this._audioContext = new AudioContext();
    }
    // HTTP REQUESTS
    getAllButtons() {
        return this.http.get("/button/all").pipe(take(1), map((buttons) => {
            return (this._cachedButtons = buttons);
        }));
    }
    getMediaByFileName(fileName) {
        return this.fileService
            .downloadFileByFileName(fileName, "response", "arraybuffer")
            .pipe(take(1), map((data) => data.body));
    }
    createButton(button, file) {
        const formData = new FormData();
        formData.append("file", file);
        return this.fileService.uploadFile(formData).pipe(take(1), switchMap((uploadedFile) => {
            button.fileName = uploadedFile.fileName;
            return this.http.post("/button", button);
        }), map((createdButton) => createdButton));
    }
    updateButton(button, file) {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            return this.fileService.uploadFile(formData).pipe(take(1), switchMap((uploadedFile) => {
                button.fileName = uploadedFile.fileName;
                return this.http.patch(`/button/${button.id}`, button);
            }), map((createdButton) => createdButton));
        }
        return this.http.patch(`/button/${button.id}`, button);
    }
    deleteButtonById(id) {
        return this.http.delete(`/button/${id}`);
    }
    createTags(tags) {
        if (!tags?.length) {
            return of([]);
        }
        return this.http.post("/tag", tags);
    }
    getTagsByNames(names) {
        return this.http.get(`/tag?names=${names.join(",")}`);
    }
    // METHODS
    async playAudio(filename) {
        if (this.soundMode === SoundMode.OVERRIDE && this._audioContext) {
            await this._audioContext
                .close()
                .then(() => console.log("Audio context closed"));
            this._audioContext = new AudioContext();
        }
        if (!this.audioByButtonFilename[filename]) {
            this.getMediaByFileName(filename)
                .pipe(take(1))
                .subscribe(async (data) => {
                console.log(`Created audio for file ${filename}`);
                this.audioByButtonFilename[filename] =
                    await this._audioContext.decodeAudioData(data);
                this._triggerPlay({
                    audioBuffer: this.audioByButtonFilename[filename],
                    filename,
                });
            });
        }
        else {
            console.log(`Using cached audio for file ${filename}`);
            this._triggerPlay({
                audioBuffer: this.audioByButtonFilename[filename],
                filename,
            });
        }
    }
    _triggerPlay(playlistElement) {
        this._playlist.push(playlistElement);
        if (this.soundMode === SoundMode.QUEUE) {
            if (this._playlist.length > 1)
                return;
        }
        this._playCachedAudio(playlistElement);
    }
    _playCachedAudio(playlistElement) {
        const source = this._audioContext.createBufferSource();
        source.buffer = playlistElement.audioBuffer;
        source.connect(this._audioContext.destination);
        source.start();
        console.log(`Playing ${playlistElement.filename}`);
        source.onended = () => {
            if (this.soundMode === SoundMode.LOOP) {
                return this._playCachedAudio(playlistElement);
            }
            this._playlist = this._playlist.filter((element) => element !== playlistElement);
            if (this.soundMode === SoundMode.QUEUE && this._playlist.length > 0) {
                this._playCachedAudio(this._playlist[0]);
            }
        };
    }
};
SoundboardService = __decorate([
    Injectable()
], SoundboardService);
export { SoundboardService };
//# sourceMappingURL=soundboard.service.js.map