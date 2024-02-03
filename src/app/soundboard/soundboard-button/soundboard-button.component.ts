import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalOptions } from "ngx-bootstrap/modal";
import { take } from "rxjs/operators";
import { ModalService } from "../../shared/services/modal.service";
import { ButtonFormModalComponent } from "../button-form-modal/button-form-modal.component";
import { SoundboardButton } from "../shared/models/soundboard-button.model";
import { SoundMode } from "../shared/models/soundmode.enum";
import { SoundboardService } from "../soundboard.service";

@Component({
  selector: "app-soundboard-button",
  templateUrl: "./soundboard-button.component.html",
  styleUrls: ["./soundboard-button.component.scss"],
})
export class SoundboardButtonComponent {
  @Input() button: SoundboardButton;
  @Input() onClick: (button: SoundboardButton) => void;
  @Output() onButtonEdited: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();
  @Output() onButtonDeleted: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();

  public isPressed: boolean = false;
  public SoundMode: typeof SoundMode = SoundMode;
  public faTrash: IconDefinition = faTrash;
  public faPencilAlt: IconDefinition = faPencilAlt;

  constructor(
    public soundboardService: SoundboardService,
    public modalService: ModalService,
  ) {}

  public editButton(): void {
    (
      this.modalService.openModal(ButtonFormModalComponent, {
        initialState: { request: "PUT", button: this.button },
      } as ModalOptions<Object>).content as ButtonFormModalComponent
    ).onFormSubmitted
      .pipe(take(1))
      .subscribe((editedButton: SoundboardButton) => {
        this.onButtonEdited.emit(editedButton);
        this.modalService.bsModalRef.hide();
      });
  }

  public deleteButton(): void {
    this.soundboardService
      .deleteButtonById(this.button.id)
      .pipe(take(1))
      .subscribe((deletedButton: SoundboardButton) => {
        this.onButtonDeleted.emit(deletedButton);
        this.modalService.bsModalRef.hide();
      });
  }
}
