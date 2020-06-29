import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SoundboardService } from "../soundboard.service";
import { SoundboardButton } from "../../models/buttons.model";
import { take } from "rxjs/operators";

@Component({
    selector: 'app-create-button-modal',
    templateUrl: './create-button-modal.component.html',
    styleUrls: ['./create-button-modal.component.scss']
})
export class CreateButtonModalComponent implements OnInit {

    public buttonFormGroup: FormGroup;

    private _fileToUpload: File;

    constructor(
        public modalService: ModalService,
        private _soundboardService: SoundboardService,
        private _formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.buttonFormGroup = this._formBuilder.group({
            name: this._formBuilder.control(null, Validators.required),
            description: this._formBuilder.control(null, Validators.required),
            color: this._formBuilder.control(null, Validators.required),
            file: this._formBuilder.control(null, Validators.required)
        });
    }

    public onFileSelect(event: any): void {
        this._fileToUpload = event.target.files.item(0) as File;
    }

    public createButton(): void {
        if (!this.buttonFormGroup.valid) return;

        this._soundboardService.createButton(this.buttonFormGroup.value as SoundboardButton, this._fileToUpload)
            .pipe(take(1))
            .subscribe((createdButton: SoundboardButton) => console.log(createdButton));
    }
}