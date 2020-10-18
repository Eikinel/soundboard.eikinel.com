import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DropdownTool, Tool } from "../shared/models/tool.model";
import { ModalService } from "../../shared/services/modal.service";
import { ButtonFormModalComponent } from "../button-form-modal/button-form-modal.component";
import { take } from "rxjs/operators";
import { SoundboardButton } from "../shared/models/buttons.model";
import { SoundMode } from "../shared/models/soundmode.enum";
import { SoundboardService } from "../soundboard.service";
import { BreakpointService } from "../../shared/services/breakpoint.service";
import { FormBuilder, FormControl } from "@angular/forms";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

@Component({
    selector: 'app-soundboard-toolbar',
    templateUrl: './soundboard-toolbar.component.html',
    styleUrls: ['./soundboard-toolbar.component.scss'],
})
export class SoundboardToolbarComponent implements OnInit {
    @Output() createdButtonEvent: EventEmitter<SoundboardButton> = new EventEmitter<SoundboardButton>();

    public tools: Tool[] = [];
    public burgerMenuCollapsed: boolean = true;
    public isSmallScreen: boolean = false;
    public searchForm: FormControl;
    public readonly soundModeLabels: { [soundMode: number]: string } = {
        [SoundMode.OVERRIDE]: 'Override',
        [SoundMode.PARALLELIZE]: 'Parallelize',
        [SoundMode.QUEUE]: 'Queue',
        [SoundMode.LOOP]: 'Loop'
    };

    constructor(
        public modalService: ModalService,
        public breakpointService: BreakpointService,
        private formBuilder: FormBuilder,
        private soundboardService: SoundboardService) {
    }

    public ngOnInit(): void {
        this.tools = [
            {
                toolKey: 'createButton',
                type: 'button',
                label: 'Create new button',
                customClass: 'font-weight-bold btn btn-success',
                onClick: () => {
                    (this.modalService.openModal(ButtonFormModalComponent)
                        .content as ButtonFormModalComponent)
                        .onFormSubmitted
                        .pipe(take(1))
                        .subscribe((createdButton: SoundboardButton) => {
                            this.createdButtonEvent.emit(createdButton);
                        });
                }
            },
            {
                toolKey: 'changeSoundMode',
                type: 'dropdown',
                list: this._invert(this.soundModeLabels),
                label: `Sound mode: ${this.soundModeLabels[this.soundboardService.soundMode]}`,
                onClick: (soundMode: SoundMode) => {
                    this.soundboardService.soundMode = soundMode;
                    localStorage.setItem('soundMode', soundMode.toString());
                    this.getToolByToolKey('changeSoundMode').label = `Sound mode: ${this.soundModeLabels[soundMode]}`;
                }
            } as DropdownTool
        ];

        this.breakpointService.innerWidth$
            .subscribe((innerWidth: number) => {
                this.isSmallScreen = innerWidth < this.breakpointService.widthBreakpoint;
                if (!this.isSmallScreen) this.burgerMenuCollapsed = true;
            });

        this.searchForm = this.formBuilder.control('');
    }

    private getToolByToolKey(toolKey: string): Tool {
        return this.tools.find((tool: Tool) => tool.toolKey === toolKey);
    }

    private _invert(object: object): object {
        return Object.entries(object).reduce((ret: object, entry: [string | number, any]) => {
            const [key, value]: [string | number, any] = entry;
            ret[value] = isNaN(key as any) ? key : Number(key);
            return ret;
        }, {});
    }
}