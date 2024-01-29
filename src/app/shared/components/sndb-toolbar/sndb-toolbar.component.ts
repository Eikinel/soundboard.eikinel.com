import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SoundboardButton } from "@core/models/buttons.model";
import { SoundMode } from "@core/models/soundmode.enum";
import { DropdownTool, Tool } from "@core/models/tool.model";
import { ButtonFormModalComponent } from "@modules/button-form-modal/button-form-modal.component";
import { SoundboardService } from "@modules/soundboard.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BreakpointService } from "@shared/services/breakpoint.service";
import { Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
  selector: "sndb-toolbar",
  templateUrl: "./sndb-toolbar.component.html",
  styleUrls: ["./sndb-toolbar.component.scss"],
})
export class SndbToolbarComponent implements OnInit {
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

  private readonly _destroyed: Subject<void> = new Subject<void>();

  constructor(
    public readonly breakpointService: BreakpointService,
    private readonly soundboardService: SoundboardService,
    private readonly modalService: NgbModal,
  ) {}

  public ngOnInit(): void {
    this.tools = [
      {
        toolKey: "createButton",
        type: "button",
        label: "Create new button",
        customClass: "font-weight-bold btn btn-success",
        onClick: () => {
          this.modalService
            .open(ButtonFormModalComponent)
            .componentInstance.onFormSubmitted.pipe(take(1))
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
