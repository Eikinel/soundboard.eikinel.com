import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const intercept: HttpRequest<any> = req.clone({
            url: '/api' + req.url
        });

        if (req.headers && !req.headers.keys().includes('Content-Type')) {
            req.headers.append('Content-Type', 'application/json; charset=utf-8');
        }

        return next.handle(intercept);
    }
}