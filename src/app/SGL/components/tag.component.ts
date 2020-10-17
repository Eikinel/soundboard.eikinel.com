import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss']
})
export class TagComponent {
    @Input() name: string;
    @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();

    public faTimes: IconDefinition = faTimes;
}