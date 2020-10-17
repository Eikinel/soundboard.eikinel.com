import { Component, Input, Type } from "@angular/core";
import { SglInputBaseComponent } from "../components/sgl-input-base.component";
import { ControlContainer } from "@angular/forms";

@Component({
    selector: 'app-sgl-tags',
    templateUrl: './sgl-tags.component.html',
    styleUrls: ['./sgl-tags.component.scss', '../sgl-common.scss'],
})
export class SglTagsComponent extends SglInputBaseComponent {
    @Input() hint: string;

    constructor(public controlContainer: ControlContainer) {
        super(controlContainer);
    }
}