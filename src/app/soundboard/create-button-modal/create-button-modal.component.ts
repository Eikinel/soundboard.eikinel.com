import { Component, OnInit } from "@angular/core";
import { ModalService } from "../../services/modal.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-create-button-modal',
    templateUrl: './create-button-modal.component.html',
    styleUrls: ['./create-button-modal.component.scss']
})
export class CreateButtonModalComponent implements OnInit {

    public buttonFormGroup: FormGroup;

    constructor(
        public modalService: ModalService,
        private formBuilder: FormBuilder) {}

    public ngOnInit(): void {
        this.buttonFormGroup = this.formBuilder.group({
            name: this.formBuilder.control('', Validators.required),
            description: this.formBuilder.control('', Validators.required),
            color: this.formBuilder.control('', Validators.required),
            file: this.formBuilder.control('', Validators.required)
        });
    }
}