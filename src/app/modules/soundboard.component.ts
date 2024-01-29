import { Component, OnInit } from "@angular/core";
import { SoundboardButton } from "@core/models/buttons.model";
import { take } from "rxjs/operators";
import { SoundboardService } from "./soundboard.service";

@Component({
  selector: "app-soundboard",
  templateUrl: "./soundboard.component.html",
  styleUrls: ["./soundboard.component.scss"],
})
export class SoundboardComponent implements OnInit {
  public buttons: SoundboardButton[] = [];

  constructor(public soundboardService: SoundboardService) {}

  public ngOnInit(): void {
    this.soundboardService
      .getAllButtons()
      .pipe(take(1))
      .subscribe((buttons: SoundboardButton[]) => (this.buttons = buttons));
  }

  public onButtonCreated(button: SoundboardButton): void {
    this.buttons.push(button);
  }
}
