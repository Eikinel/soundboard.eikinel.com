import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonFormModalComponent } from "@modules/button-form-modal/button-form-modal.component";
import { ComponentsModule } from "@shared/components/components.module";
import { SoundboardComponent } from "./soundboard.component";
import { SoundboardService } from "./soundboard.service";

@NgModule({
  declarations: [SoundboardComponent, ButtonFormModalComponent],
  providers: [SoundboardService],
  imports: [CommonModule, ReactiveFormsModule, ComponentsModule],
})
export class SoundboardModule {}
