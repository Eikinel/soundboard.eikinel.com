import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SndbButtonComponent } from "@shared/components/sndb-button/sndb-button.component";
import { SndbInputComponent } from "@shared/components/sndb-input/sndb-input.component";
import { SndbModalHeaderComponent } from "@shared/components/sndb-modal/sndb-modal-header/sndb-modal-header.component";
import { SndbModalComponent } from "@shared/components/sndb-modal/sndb-modal.component";
import { SndbTagsComponent } from "@shared/components/sndb-tags/sndb-tags.component";
import { SndbToolbarComponent } from "@shared/components/sndb-toolbar/sndb-toolbar.component";

@NgModule({
  declarations: [
    SndbInputComponent,
    SndbButtonComponent,
    SndbToolbarComponent,
    SndbModalComponent,
    SndbModalHeaderComponent,
    SndbTagsComponent,
  ],
  imports: [ReactiveFormsModule, CommonModule, NgbModule],
  exports: [
    SndbInputComponent,
    SndbButtonComponent,
    SndbToolbarComponent,
    SndbModalComponent,
    SndbTagsComponent,
  ],
})
export class ComponentsModule {}
