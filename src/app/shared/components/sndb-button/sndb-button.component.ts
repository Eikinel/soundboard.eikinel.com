import { Component, Input } from "@angular/core";
import { SoundboardButton } from "@core/models/buttons.model";

@Component({
  selector: "sndb-button",
  templateUrl: "./sndb-button.component.html",
  styleUrls: ["./sndb-button.component.scss"],
})
export class SndbButtonComponent {
  @Input() button: SoundboardButton;
  @Input() onClick: (...args: any[]) => any;

  public isPressed: boolean = false;
}
