import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { take } from "rxjs/operators";
import {
  SoundboardButton,
  SoundboardButtonEvent,
} from "./shared/models/soundboard-button.model";
import { SoundboardToolbarComponent } from "./soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardService } from "./soundboard.service";

@Component({
  selector: "app-soundboard",
  templateUrl: "./soundboard.component.html",
  styleUrls: ["./soundboard.component.scss"],
})
export class SoundboardComponent implements OnInit {
  @ViewChild("soundboardToolbar") soundboardToolbar: SoundboardToolbarComponent;

  public buttons: SoundboardButton[] = [];
  public categories: string[] = [];
  public loading: boolean = true;
  public SoundboardButtonEvent: typeof SoundboardButtonEvent =
    SoundboardButtonEvent;

  private readonly _soundboardEventListeners: {
    [event: number]: (button: SoundboardButton) => void;
  };

  constructor(public soundboardService: SoundboardService) {
    this._soundboardEventListeners = {
      [SoundboardButtonEvent.CREATED]: (button: SoundboardButton) =>
        this.onButtonCreated(button),
      [SoundboardButtonEvent.UPDATED]: (button: SoundboardButton) =>
        this.onButtonUpdated(button),
      [SoundboardButtonEvent.DELETED]: (button: SoundboardButton) =>
        this.onButtonDeleted(button),
    };
  }

  public ngOnInit(): void {
    this.soundboardService
      .getAllButtons()
      .pipe(take(1))
      .subscribe((buttons: SoundboardButton[]) => {
        this.setCategories(buttons);
        this.buttons = buttons;
        this.loading = false;
      });
  }

  public onSearch(search: string): void {
    const regex = new RegExp(search, "gi");

    this.buttons.map((button: SoundboardButton) => {
      button.hide =
        !button.name.match(regex) &&
        !button.category.match(regex) &&
        !button.tags.some((tag) => tag.name.match(regex));
    });
  }

  public onButtonEvent(
    event: SoundboardButtonEvent,
    button: SoundboardButton,
  ): void {
    this._soundboardEventListeners[event]?.(button);
    this.setCategories(this.buttons);
  }

  public getVisibleCategories(): string[] {
    return this.categories
      .map((category) => {
        if (
          this.getButtonsByCategory(category).some((button) => !button.hide)
        ) {
          return category;
        }
      })
      .sort((a, b) => a.localeCompare(b));
  }

  public getButtonsByCategory(category: string): SoundboardButton[] {
    return this.buttons.filter((button) => button.category === category);
  }

  private onButtonCreated(button: SoundboardButton): void {
    console.log(`Button "${button.name}" created`);
    this.buttons.push(button);
  }

  private onButtonUpdated(editedButton: SoundboardButton): void {
    console.log(`Button "${editedButton.name}" edited`);
    this.buttons.splice(
      this.buttons.findIndex((b: SoundboardButton) => b.id === editedButton.id),
      1,
      editedButton,
    );
  }

  private onButtonDeleted(deletedButton: SoundboardButton): void {
    console.log(`Button "${deletedButton.name}" deleted`);
    this.buttons = this.buttons.filter(
      (button: SoundboardButton) => button.id !== deletedButton.id,
    );
  }

  private setCategories(buttons: SoundboardButton[]): void {
    let categories = buttons.map(({ category }) => category);

    categories = categories.filter(
      (category, i) => categories.findIndex((c) => c === category) === i,
    );

    this.categories = categories;
  }

  @HostListener("click", ["$event"])
  private onClickWindow(event: Event): void {
    const target: HTMLElement = event.target as HTMLElement;
    const forbiddenClass: string[] = [
      "tool",
      "burger-bar",
      "burger-icon-container",
      "dropdown-item",
    ];

    if (
      !this.soundboardToolbar.burgerMenuCollapsed &&
      forbiddenClass.filter((c: string) => !target.classList.contains(c))
        .length === forbiddenClass.length
    ) {
      this.soundboardToolbar.burgerMenuCollapsed = true;
    }
  }
}
