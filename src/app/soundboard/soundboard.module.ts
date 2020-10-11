import { NgModule } from "@angular/core";
import { SoundboardComponent } from "./soundboard.component";
import { SoundboardButtonComponent } from "./soundboard-button/soundboard-button.component";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { CommonModule } from "@angular/common";
import { ModalModule } from "ngx-bootstrap/modal";
import { ButtonFormModalComponent } from "./button-form-modal/button-form-modal.component";
import { ModalService } from "../services/modal.service";
import { ReactiveFormsModule } from "@angular/forms";
import { SGLModule } from "../SGL/SGL.module";
import { BsDropdownConfig, BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        SoundboardComponent,
        SoundboardButtonComponent,
        SoundboardToolbarComponent,
        ButtonFormModalComponent,
    ],
    providers: [
        SoundboardService,
        ModalService,
        BsDropdownConfig,
    ],
    imports: [
        CommonModule,
        ModalModule.forRoot(),
        ReactiveFormsModule,
        SGLModule,
        BsDropdownModule,
        CollapseModule,
        FontAwesomeModule,
    ]
})
export class SoundboardModule {
}