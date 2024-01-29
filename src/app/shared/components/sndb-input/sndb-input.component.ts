import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";

@Component({
  selector: "sndb-input",
  templateUrl: "./sndb-input.component.html",
  styleUrls: ["./sndb-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SndbInputComponent),
      multi: true,
    },
  ],
})
export class SndbInputComponent implements OnInit, ControlValueAccessor {
  @Input() formControlName: string;
  @Input() label: string;
  @Input() type: "text" | "file" = "text";

  public control: FormControl;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.control = this.rootFormGroup.control.get(
      this.formControlName,
    ) as FormControl;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

  writeValue(obj: any): void {}
}
