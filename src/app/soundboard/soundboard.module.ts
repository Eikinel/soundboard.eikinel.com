import { NgModule } from "@angular/core";
import { SoundboardComponent } from "./soundboard.component";
import { SoundboardButtonComponent } from "./soundboard-button/soundboard-button.component";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { CreateButtonModalComponent } from "./create-button-modal/create-button-modal.component";
import { ModalService } from "../services/modal.service";
import { ReactiveFormsModule } from "@angular/forms";
import { SGLModule } from "../SGL/SGL.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [
        SoundboardComponent,
        SoundboardButtonComponent,
        SoundboardToolbarComponent,
        CreateButtonModalComponent
    ],
    providers: [
        SoundboardService,
        ModalService
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        SGLModule
    ]
})
export class SoundboardModule {
}