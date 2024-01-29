import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SoundboardButton, Tag } from "@core/models/soundboard-button.model";
import { Observable } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { SoundboardService } from "../soundboard.service";

enum ButtonFormKeys {
  ID = "id",
  NAME = "name",
  DESCRIPTION = "description",
  TAGS = "tags",
  COLOR = "color",
  FILE = "file",
}

@Component({
  selector: "app-button-form-modal",
  templateUrl: "./button-form-modal.component.html",
  styleUrls: ["./button-form-modal.component.scss"],
})
export class ButtonFormModalComponent implements OnInit {
  @Input() request: "PUT" | "POST" = "POST";
  @Input() button: SoundboardButton = {} as SoundboardButton;
  @Output() onFormSubmitted: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();

  public buttonFormGroup: FormGroup;
  public fileCustomErrors: { [error: string]: string } = {
    pattern:
      "This file type is not accepted. The accepted ones are : .mp3, .wav, .ogg, .flac, .wma, .m4a",
  };
  public isCreation: boolean;

  private _fileToUpload: File;

  constructor(
    private readonly soundboardService: SoundboardService,
    private readonly formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.isCreation = this.request === "POST";
    this.buttonFormGroup = this.formBuilder.group({
      [ButtonFormKeys.ID]: this.formBuilder.control(this.button.id),
      [ButtonFormKeys.NAME]: this.formBuilder.control(this.button.name, [
        Validators.required,
      ]),
      [ButtonFormKeys.DESCRIPTION]: this.formBuilder.control(
        this.button.description,
        [Validators.required],
      ),
      [ButtonFormKeys.TAGS]: this.formBuilder.array(this.button.tags || []),
      [ButtonFormKeys.COLOR]: this.formBuilder.control(
        this.button.color || "#FFF",
        [Validators.required],
      ),
      [ButtonFormKeys.FILE]: this.formBuilder.control(
        null,
        this.isCreation ? [Validators.required] : [],
      ),
    });
  }

  public onFileSelect(event: any): void {
    this._fileToUpload = event.target.files.item(0) as File;
  }

  public submit(): void {
    if (!this.buttonFormGroup.valid) return;

    // Disable all falsy values
    Object.keys(this.buttonFormGroup.value).forEach((key: string) => {
      !this.buttonFormGroup.value[key] &&
        this.buttonFormGroup.get(key).disable();
    });

    const tagsFormArray: FormArray = this.buttonFormGroup.get(
      ButtonFormKeys.TAGS,
    ) as FormArray;

    this.soundboardService
      .createTags(tagsFormArray.value)
      .pipe(
        take(1),
        switchMap(() =>
          this.soundboardService.getTagsByNames(
            tagsFormArray.value.map((tag: Tag) => tag.name),
          ),
        ),
        switchMap((tags: Tag[]) => {
          const method: (
            button: SoundboardButton,
            file: File,
          ) => Observable<SoundboardButton> = this.isCreation
            ? this.soundboardService.createButton
            : this.soundboardService.updateButton;

          // Fill new tags with id from API
          tagsFormArray.patchValue(tags);

          return method.bind(this.soundboardService)(
            this.buttonFormGroup.value as SoundboardButton,
            this._fileToUpload,
          );
        }),
      )
      .subscribe((button: SoundboardButton) => {
        this.onFormSubmitted.emit(button);
      });
  }
}
