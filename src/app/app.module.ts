import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiInterceptor } from "./api.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { FileService } from "./services/file.service";
import { BreakpointService } from "./services/breakpoint.service";
import { SoundboardModule } from "./soundboard/soundboard.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SoundboardModule,
        FontAwesomeModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
        FileService,
        BreakpointService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
