import { Component, Input } from "@angular/core";
import { AbstractControl, ControlContainer, FormGroup } from "@angular/forms";

@Component({
  selector: "sndb-input",
  templateUrl: "./sndb-input.component.html",
  styleUrls: ["./sndb-input.component.scss"],
})
export class SndbInputComponent {
  @Input() controlName: string;
  @Input() label: string;
  @Input() type: "text" | "file" = "text";

  private readonly _formGroup: FormGroup;

  get formGroup(): FormGroup {
    return this._formGroup;
  }

  constructor(public controlContainer: ControlContainer) {
    this._formGroup = this.controlContainer.control as FormGroup;
  }
}
