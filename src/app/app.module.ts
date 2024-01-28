import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FileService } from "@core/services/file.service";
import { ApiInterceptor } from "./api.interceptor";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SoundboardModule } from "./soundboard/soundboard.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SoundboardModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    FileService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
