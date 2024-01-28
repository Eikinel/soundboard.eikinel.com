import { NgModule } from "@angular/core";
import { SndbButtonComponent } from "./sndb-button/sndb-button.component";
import { SndbInputComponent } from "./sndb-input/sndb-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SndbToolbarComponent } from "./sndb-toolbar/sndb-toolbar.component";

@NgModule({
  declarations: [SndbInputComponent, SndbButtonComponent, SndbToolbarComponent],
  imports: [ReactiveFormsModule],
  exports: [SndbInputComponent, SndbButtonComponent, SndbToolbarComponent],
})
export class ComponentsModule {}
