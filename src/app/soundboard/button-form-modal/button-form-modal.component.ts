import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService } from "../../shared/services/modal.service";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SoundboardService } from "../soundboard.service";
import { SoundboardButton, Tag } from "../shared/models/soundboard-button.model";
import { map, switchMap, take } from "rxjs/operators";
import { EMPTY, Observable, of } from "rxjs";
import { ApiHttpResponse } from "../../shared/models/app-http-response.model";

enum ButtonFormKeys {
    ID = 'id',
    NAME = 'name',
    DESCRIPTION = 'description',
    TAGS = 'tags',
    COLOR = 'color',
    FILE = 'file',
}

@Component({
    selector: 'app-button-form-modal',
    templateUrl: './button-form-modal.component.html',
    styleUrls: ['./button-form-modal.component.scss']
})
export class ButtonFormModalComponent implements OnInit {
    @Input() request: 'PUT' | 'POST' = 'POST';
    @Input() button: SoundboardButton = {} as SoundboardButton;
    @Output() onFormSubmitted: EventEmitter<SoundboardButton> = new EventEmitter<SoundboardButton>();

    public buttonFormGroup: FormGroup;
    public fileCustomErrors: { [error: string]: string } = {
        pattern: 'This file type is not accepted. The accepted ones are : .mp3, .wav, .ogg, .flac, .wma, .m4a'
    };
    public isCreation: boolean;

    private _fileToUpload: File;

    constructor(
        public modalService: ModalService,
        private _soundboardService: SoundboardService,
        private _formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.isCreation = this.request === 'POST';
        this.buttonFormGroup = this._formBuilder.group({
            [ButtonFormKeys.ID]: this._formBuilder.control(this.button.id),
            [ButtonFormKeys.NAME]: this._formBuilder.control(this.button.name, [Validators.required]),
            [ButtonFormKeys.DESCRIPTION]: this._formBuilder.control(this.button.description, [Validators.required]),
            [ButtonFormKeys.TAGS]: this._formBuilder.array(this.button.tags || []),
            [ButtonFormKeys.COLOR]: this._formBuilder.control(this.button.color || '#FFF', [Validators.required]),
            [ButtonFormKeys.FILE]: this._formBuilder.control(null, this.isCreation ? [Validators.required] : []),
        });
    }

    public onFileSelect(event: any): void {
        this._fileToUpload = event.target.files.item(0) as File;
    }

    public submit(): void {
        if (!this.buttonFormGroup.valid) return;

        // Disable all falsy values
        Object.keys(this.buttonFormGroup.value).forEach((key: string) => {
           !this.buttonFormGroup.value[key] && this.buttonFormGroup.get(key).disable();
        });

        const tagsFormArray: FormArray = this.buttonFormGroup.get(ButtonFormKeys.TAGS) as FormArray;

        this._soundboardService.createTags(tagsFormArray.value)
            .pipe(
                take(1),
                switchMap(() => this._soundboardService.getTagsByNames(tagsFormArray.value.map((tag: Tag) => tag.name))),
                switchMap((tags: Tag[]) => {
                    const method: (button: SoundboardButton, file: File) => Observable<SoundboardButton> =
                        this.isCreation ? this._soundboardService.createButton : this._soundboardService.updateButton;

                    // Fill new tags with id from API
                    tagsFormArray.patchValue(tags);

                    return method.bind(this._soundboardService)(this.buttonFormGroup.value as SoundboardButton, this._fileToUpload);
                })
            )
            .subscribe((button: SoundboardButton) => {
                this.onFormSubmitted.emit(button);
                this.modalService.bsModalRef.hide();
            });
    }
}