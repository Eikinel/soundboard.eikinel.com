import { Component, Input } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { SndbInputBaseComponent } from "@core/abstract/sgl-input-base.component";

@Component({
  selector: "sndb-tags",
  templateUrl: "./sndb-tags.component.html",
  styleUrls: ["./sndb-tags.component.scss", "../sndb.scss"],
})
export class SndbTagsComponent extends SndbInputBaseComponent {
  @Input() hint: string;

  constructor(public controlContainer: ControlContainer) {
    super(controlContainer);
  }
}
