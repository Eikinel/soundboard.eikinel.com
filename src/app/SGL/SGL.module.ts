import { NgModule } from "@angular/core";
import { SglInputComponent } from "./SGL-input/sgl-input.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        SglInputComponent,
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        SglInputComponent,
    ]
})
export class SGLModule {
}