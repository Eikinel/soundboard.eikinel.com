import { NgModule } from "@angular/core";
import { SglInputComponent } from "./SGL-input/sgl-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SglColorPickerComponent } from "./SGL-color-picker/sgl-color-picker.component";
import { ColorPickerModule } from "@iplab/ngx-color-picker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormErrorDirective } from "./directives/form-error.directive";
import { ControlErrorComponent } from "./components/control-error.component";
import { FormSubmitDirective } from "./directives/form-submit.directive";

@NgModule({
    declarations: [
        FormErrorDirective,
        FormSubmitDirective,
        SglInputComponent,
        SglColorPickerComponent,
        ControlErrorComponent
    ],
    imports: [
        ReactiveFormsModule,
        ColorPickerModule,
        BrowserAnimationsModule
    ],
    exports: [
        SglInputComponent,
        SglColorPickerComponent,
        FormErrorDirective,
        FormSubmitDirective
    ],
    entryComponents: [ControlErrorComponent]
})
export class SGLModule {
}