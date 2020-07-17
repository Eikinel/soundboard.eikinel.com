import { Component, Input, OnInit, SkipSelf } from "@angular/core";
import { SoundboardService } from "../../soundboard.service";
import { SoundboardButton } from "../../models/buttons.model";
import { ButtonAction, ButtonActionEnum } from "../../models/button-actions.model";

@Component({
    selector: 'app-soundboard-button-actions',
    templateUrl: './soundboard-button-actions.component.html',
    styleUrls: ['./soundboard-button-actions.component.scss'],
})
export class SoundboardButtonActionsComponent implements OnInit {
    @Input() button: SoundboardButton;

    public actions: { [action: number]: ButtonAction };
    public ButtonActionEnum: typeof ButtonActionEnum = ButtonActionEnum;

    constructor(@SkipSelf() soundboardService: SoundboardService) {
        this.actions = {
            [ButtonActionEnum.EDIT]: {
                icon: 'icon-pencil',
                onClick: () => {
                    console.log("Clicked on edit");
                }
            }
        };
    }

    public ngOnInit(): void {
        console.log(this.button);
    }
}