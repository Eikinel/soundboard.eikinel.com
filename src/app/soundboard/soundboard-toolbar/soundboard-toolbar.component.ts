import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Tool } from "../../models/tool.model";
import { ModalService } from "../../services/modal.service";
import { CreateButtonModalComponent } from "../create-button-modal/create-button-modal.component";
import { take } from "rxjs/operators";
import { SoundboardButton } from "../../models/buttons.model";

@Component({
    selector: 'app-soundboard-toolbar',
    templateUrl: './soundboard-toolbar.component.html',
    styleUrls: ['./soundboard-toolbar.component.scss'],
})
export class SoundboardToolbarComponent implements OnInit {
    @Output() createdButtonEvent: EventEmitter<SoundboardButton> = new EventEmitter<SoundboardButton>();

    public tools: { [toolKey: string]: Tool } = {};

    constructor(public modalService: ModalService) {
    }

    public ngOnInit(): void {
        this.tools = {
            createButton: {
                label: `Create new button`,
                customClass: 'font-weight-bold',
                onClick: () => {
                    this.modalService.openModal(CreateButtonModalComponent, {
                        class: 'modal-lg',
                        animated: true
                    });

                    const modalContent: CreateButtonModalComponent = this.modalService.bsModalRef.content as CreateButtonModalComponent;

                    modalContent.buttonCreatedEvent
                        .pipe(take(1))
                        .subscribe((createdButton: SoundboardButton) => {
                            this.createdButtonEvent.emit(createdButton);
                        });
                }
            }
        };
    }

    public getToolByToolKey(toolKeyToFind: string): Tool | undefined {
        const foundToolPair: [string, Tool] | undefined = Object.entries(this.tools).find((value: [string, Tool]) => {
            const [toolKey, _]: [string, Tool] = value;
            if (toolKeyToFind === toolKey) return true;
        });

        if (foundToolPair) return foundToolPair[1];
    }
}