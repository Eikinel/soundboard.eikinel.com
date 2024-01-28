import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { SoundboardService } from "../soundboard.service";
import {
  SoundboardButton,
  SoundboardButtonPayload,
} from "../../models/buttons.model";
import { take } from "rxjs/operators";

@Component({
  selector: "app-create-button-modal",
  templateUrl: "./create-button-modal.component.html",
  styleUrls: ["./create-button-modal.component.scss"],
})
export class CreateButtonModalComponent implements OnInit {
  @Output() buttonCreatedEvent: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();

  public buttonFormGroup: UntypedFormGroup;

  private _fileToUpload: File;

  constructor(
    public modalService: ModalService,
    private _soundboardService: SoundboardService,
    private _formBuilder: UntypedFormBuilder,
  ) {}

  public ngOnInit(): void {
    this.buttonFormGroup = this._formBuilder.group({
      name: this._formBuilder.control(null, Validators.required),
      description: this._formBuilder.control(null, Validators.required),
      color: this._formBuilder.control(null, Validators.required),
      file: this._formBuilder.control(null, Validators.required),
    });
  }

  public onFileSelect(event: any): void {
    this._fileToUpload = event.target.files.item(0) as File;
  }

  public createButton(): void {
    if (!this.buttonFormGroup.valid) return;

    this._soundboardService
      .createButton(
        this.buttonFormGroup.value as SoundboardButton,
        this._fileToUpload,
      )
      .pipe(take(1))
      .subscribe((createdButton: SoundboardButton) => {
        console.log(`Button ${createdButton.name} created`);
        this.buttonCreatedEvent.emit(createdButton);
        this.modalService.bsModalRef.hide();
      });
  }
}
