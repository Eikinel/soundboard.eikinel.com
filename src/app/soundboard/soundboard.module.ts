import { NgModule } from "@angular/core";
import { SoundboardComponent } from "./soundboard.component";
import { SoundboardButtonComponent } from "./soundboard-button/soundboard-button.component";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        SoundboardComponent,
        SoundboardButtonComponent,
        SoundboardToolbarComponent
    ],
    providers: [SoundboardService],
    imports: [
        CommonModule
    ]
})
export class SoundboardModule {
}