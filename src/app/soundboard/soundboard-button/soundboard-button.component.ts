import {
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";
import { SoundboardButton } from "../models/buttons.model";
import { SoundboardService } from "../soundboard.service";
import { SoundMode } from "../models/soundmode.enum";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalService } from "../../services/modal.service";
import { take } from "rxjs/operators";
import {CreateButtonModalComponent} from "../create-button-modal/create-button-modal.component";

@Component({
    selector: 'app-soundboard-button',
    templateUrl: './soundboard-button.component.html',
    styleUrls: ['./soundboard-button.component.scss'],
})
export class SoundboardButtonComponent {
    @Input() button: SoundboardButton;
    @Input() onClick: (...args: any[]) => any;
    @Output() onButtonDeleted: EventEmitter<string> = new EventEmitter<string>();

    public isPressed: boolean = false;
    public SoundMode: typeof SoundMode = SoundMode;
    public faTrash: IconDefinition = faTrash;
    public faPencilAlt: IconDefinition = faPencilAlt;
    public CreateButtonModalComponent: typeof CreateButtonModalComponent = CreateButtonModalComponent;

    constructor(
        public soundboardService: SoundboardService,
        public modalService: ModalService) {
    }

    public deleteButton(): void {
        this.soundboardService.deleteButtonById(this.button.id)
            .pipe(take(1))
            .subscribe(() => {
                console.log(`Button with name "${this.button.name}" deleted`);
                this.onButtonDeleted.emit(this.button.id);
                this.modalService.bsModalRef.hide();
            })
    }
}