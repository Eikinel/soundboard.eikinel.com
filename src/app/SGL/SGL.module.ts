import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ColorPickerModule } from "@iplab/ngx-color-picker";
import { TypeaheadModule } from "ngx-bootstrap/typeahead";
import { ControlErrorComponent } from "./components/control-error.component";
import { TagComponent } from "./components/tag/tag.component";
import { FormErrorDirective } from "./directives/form-error.directive";
import { FormOptionalDirective } from "./directives/form-optional.directive";
import { FormSubmitDirective } from "./directives/form-submit.directive";
import { TagDirective } from "./directives/tag.directive";
import { SglColorPickerComponent } from "./SGL-color-picker/sgl-color-picker.component";
import { SglInputComponent } from "./SGL-input/sgl-input.component";
import { SglModalComponent } from "./SGL-modal/sgl-modal.component";
import { SglSelectComponent } from "./SGL-select/sgl-select.component";
import { SglTagsComponent } from "./SGL-tags/sgl-tags.component";

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
    SglSelectComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ColorPickerModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    TypeaheadModule,
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
    SglSelectComponent,
  ],
})
export class SGLModule {}
