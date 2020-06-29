import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoundboardModule } from "./soundboard/soundboard.module";
import { ApiInterceptor } from "./api.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SoundboardModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
