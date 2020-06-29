import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class FileService {

    constructor(private http: HttpClient) {
    }

    public uploadFile(file: File): Observable<any> {
        return this.http.post('/file', file)
            .pipe(
                take(1),
                map((data: any) => data)
            );
    }

    public downloadFileByFileName(fileName: string, observe?: string, responseType?: string): Observable<any> {
        return this.http.get(`/file/${fileName}`, {
            observe: observe as any || 'body',
            responseType: responseType as any || 'json'
        })
            .pipe(
                take(1),
                map((data: any) => data)
            );
    }
}