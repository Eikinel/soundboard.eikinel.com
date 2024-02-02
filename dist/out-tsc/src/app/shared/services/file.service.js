import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { map, take } from "rxjs/operators";
let FileService = class FileService {
    constructor(http) {
        this.http = http;
    }
    uploadFile(fileFormData, headers) {
        if (!headers)
            headers = new HttpHeaders();
        return this.http.post("/file", fileFormData, { headers }).pipe(take(1), map((data) => data));
    }
    downloadFileByFileName(fileName, observe, responseType) {
        return this.http
            .get(`/file/${fileName}`, {
            observe: observe || "body",
            responseType: responseType || "json",
        })
            .pipe(take(1), map((data) => data));
    }
};
FileService = __decorate([
    Injectable()
], FileService);
export { FileService };
//# sourceMappingURL=file.service.js.map