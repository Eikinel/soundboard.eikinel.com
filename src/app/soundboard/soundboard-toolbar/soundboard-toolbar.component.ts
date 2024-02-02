import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";
import { BreakpointService } from "../../shared/services/breakpoint.service";
import { ModalService } from "../../shared/services/modal.service";
import { ButtonFormModalComponent } from "../button-form-modal/button-form-modal.component";
import { SoundboardButton } from "../shared/models/soundboard-button.model";
import { SoundMode } from "../shared/models/soundmode.enum";
import { DropdownTool, Tool } from "../shared/models/tool.model";
import { SoundboardService } from "../soundboard.service";

@Component({
  selector: "app-soundboard-toolbar",
  templateUrl: "./soundboard-toolbar.component.html",
  styleUrls: ["./soundboard-toolbar.component.scss"],
})
export class SoundboardToolbarComponent implements OnInit {
  @Output() createdButtonEvent: EventEmitter<SoundboardButton> =
    new EventEmitter<SoundboardButton>();
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  public tools: Tool[] = [];
  public burgerMenuCollapsed: boolean = true;
  public isSmallScreen: boolean = false;
  public searchForm: FormControl;
  public readonly soundModeLabels: { [soundMode: number]: string } = {
    [SoundMode.OVERRIDE]: "Override",
    [SoundMode.PARALLELIZE]: "Parallelize",
    [SoundMode.QUEUE]: "Queue",
    [SoundMode.LOOP]: "Loop",
  };
  public masterControl: FormControl;

  private readonly _destroyed: Subject<void> = new Subject<void>();

  constructor(
    public modalService: ModalService,
    public breakpointService: BreakpointService,
    private soundboardService: SoundboardService,
  ) {}

  public ngOnInit(): void {
    this.soundboardService.master = true;
    this.masterControl = new FormControl(this.soundboardService.master);
    this.tools = [
      {
        toolKey: "createButton",
        type: "button",
        label: "Create new button",
        customClass: "font-weight-bold btn btn-success",
        onClick: () => {
          (
            this.modalService.openModal(ButtonFormModalComponent)
              .content as ButtonFormModalComponent
          ).onFormSubmitted
            .pipe(take(1))
            .subscribe((createdButton: SoundboardButton) => {
              this.createdButtonEvent.emit(createdButton);
            });
        },
      },
      {
        toolKey: "changeSoundMode",
        type: "dropdown",
        list: this._invert(this.soundModeLabels),
        label: `Sound mode: ${this.soundModeLabels[this.soundboardService.soundMode]}`,
        onClick: (soundMode: SoundMode) => {
          this.soundboardService.soundMode = soundMode;
          localStorage.setItem("soundMode", soundMode.toString());
          this.getToolByToolKey("changeSoundMode").label =
            `Sound mode: ${this.soundModeLabels[soundMode]}`;
        },
      } as DropdownTool,
      {
        toolKey: "master",
        type: "checkbox",
        label: "Maximize volume",
        onClick: () => {
          this.soundboardService.master = this.masterControl.value;
        },
      },
    ];

    this.breakpointService.innerWidth$.subscribe((innerWidth: number) => {
      this.isSmallScreen = innerWidth < this.breakpointService.widthBreakpoint;
      if (!this.isSmallScreen) this.burgerMenuCollapsed = true;
    });

    this.searchForm = new FormControl();
    this.searchForm.valueChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((search: string) => {
        this.search.emit(search);
      });
  }

  private getToolByToolKey(toolKey: string): Tool {
    return this.tools.find((tool: Tool) => tool.toolKey === toolKey);
  }

  private _invert(object: object): object {
    return Object.entries(object).reduce(
      (ret: object, entry: [string | number, any]) => {
        const [key, value]: [string | number, any] = entry;
        ret[value] = isNaN(key as any) ? key : Number(key);
        return ret;
      },
      {},
    );
  }
}
