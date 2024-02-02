import { Component, Input, ViewEncapsulation } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";

@Component({
  selector: "app-sgl-select",
  templateUrl: "./sgl-select.component.html",
  styleUrls: ["./sgl-select.component.scss", "../sgl-common.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SglSelectComponent extends SglInputBaseComponent {
  @Input() controlName: string;
  @Input() label: string;
  @Input() data: string[];
  @Input() customErrors: object = {};

  constructor(public controlContainer: ControlContainer) {
    super(controlContainer);
  }
}
