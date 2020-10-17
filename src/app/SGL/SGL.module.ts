import { NgModule } from "@angular/core";
import { SglInputComponent } from "./SGL-input/sgl-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SglColorPickerComponent } from "./SGL-color-picker/sgl-color-picker.component";
import { ColorPickerModule } from "@iplab/ngx-color-picker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormErrorDirective } from "./directives/form-error.directive";
import { ControlErrorComponent } from "./components/control-error.component";
import { FormSubmitDirective } from "./directives/form-submit.directive";
import { SglModalComponent } from "./SGL-modal/sgl-modal.component";
import { SglTagsComponent } from "./SGL-tags/sgl-tags.component";
import { TagDirective } from "./directives/tag.directive";
import { FormOptionalDirective } from "./directives/form-optional.directive";
import { TagComponent } from "./components/tag.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [
        FormErrorDirective,
        FormSubmitDirective,
        FormOptionalDirective,
        TagDirective,
        SglInputComponent,
        SglColorPickerComponent,
        ControlErrorComponent,
        TagComponent,
        SglModalComponent,
        SglTagsComponent,
    ],
    imports: [
        ReactiveFormsModule,
        ColorPickerModule,
        BrowserAnimationsModule,
        FontAwesomeModule
    ],
    exports: [
        FormErrorDirective,
        FormSubmitDirective,
        FormOptionalDirective,
        TagDirective,
        SglInputComponent,
        SglColorPickerComponent,
        SglModalComponent,
        SglTagsComponent,
    ],
    entryComponents: [ControlErrorComponent]
})
export class SGLModule {
}