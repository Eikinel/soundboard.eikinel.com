import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DropdownTool, Tool } from "../models/tool.model";
import { ModalService } from "../../services/modal.service";
import { CreateButtonModalComponent } from "../create-button-modal/create-button-modal.component";
import { take } from "rxjs/operators";
import { SoundboardButton } from "../models/buttons.model";
import { BsModalRef } from "ngx-bootstrap/modal";
import { SoundMode } from "../models/soundmode.enum";
import { SoundboardService } from "../soundboard.service";

@Component({
    selector: 'app-soundboard-toolbar',
    templateUrl: './soundboard-toolbar.component.html',
    styleUrls: ['./soundboard-toolbar.component.scss'],
})
export class SoundboardToolbarComponent implements OnInit {
    @Output() createdButtonEvent: EventEmitter<SoundboardButton> = new EventEmitter<SoundboardButton>();

    public tools: Tool[] = [];
    public readonly soundModeLabels: { [soundMode: number]: string } = {
        [SoundMode.OVERRIDE]: 'Override',
        [SoundMode.PARALLELIZE]: 'Parallelize',
        [SoundMode.QUEUE]: 'Queue',
    };

    constructor(
        public modalService: ModalService,
        private soundboardService: SoundboardService) {
    }

    public ngOnInit(): void {
        this.tools = [
            {
                toolKey: 'createButton',
                label: 'Create new button',
                customClass: 'font-weight-bold',
                onClick: () => {
                    const modalRef: BsModalRef = this.modalService.openModal(CreateButtonModalComponent, {
                        class: 'modal-md',
                        animated: true
                    });

                    (modalRef.content as CreateButtonModalComponent).buttonCreatedEvent
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