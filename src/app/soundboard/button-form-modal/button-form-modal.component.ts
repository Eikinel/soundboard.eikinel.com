import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SoundboardService } from "../soundboard.service";
import { SoundboardButton, Tag } from "../models/buttons.model";
import { take } from "rxjs/operators";
import { Observable } from "rxjs";

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

        this.button.tags = [
            { id: '52', name: 'jaj' },
            { id: '52', name: 'owo' },
            { id: '52', name: 'jouj' }
        ];
        this.buttonFormGroup = this._formBuilder.group({
            id: this._formBuilder.control(this.button.id),
            name: this._formBuilder.control(this.button.name, [Validators.required]),
            description: this._formBuilder.control(this.button.description, [Validators.required]),
            tags: this._formBuilder.control(this.button.tags?.map((tag: Tag) => tag.name).join(', ')),
            color: this._formBuilder.control(this.button.color, [Validators.required]),
            file: this._formBuilder.control(null, this.isCreation ? [Validators.required] : []),
        });
    }

    public onFileSelect(event: any): void {
        this._fileToUpload = event.target.files.item(0) as File;
    }

    public submit(): void {
        if (!this.buttonFormGroup.valid) return;

        const method: (button: SoundboardButton, file: File) => Observable<SoundboardButton> =
            this.isCreation ? this._soundboardService.createButton : this._soundboardService.updateButton;

        // Disable all falsy values
        Object.keys(this.buttonFormGroup.value).forEach((key: string) => {
           !this.buttonFormGroup.value[key] && this.buttonFormGroup.get(key).disable();
        });

        method.bind(this._soundboardService)(this.buttonFormGroup.value as SoundboardButton, this._fileToUpload)
            .pipe(take(1))
            .subscribe((button: SoundboardButton) => {
                this.onFormSubmitted.emit(button);
                this.modalService.bsModalRef.hide();
            });
    }
}