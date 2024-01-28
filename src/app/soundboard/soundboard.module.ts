import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "@components/components.module";
import { ModalService } from "@core/services/modal.service";
import { ModalModule } from "ngx-bootstrap/modal";
import { CreateButtonModalComponent } from "./create-button-modal/create-button-modal.component";
import { SoundboardComponent } from "./soundboard.component";
import { SoundboardService } from "./soundboard.service";

@NgModule({
  declarations: [SoundboardComponent, CreateButtonModalComponent],
  providers: [SoundboardService, ModalService],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class SoundboardModule {}
