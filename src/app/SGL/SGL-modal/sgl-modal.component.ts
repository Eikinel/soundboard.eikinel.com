import { Component, Input } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
    selector: 'app-sgl-modal',
    templateUrl: './sgl-modal.component.html',
    styleUrls: ['./sgl-modal.component.scss', '../sgl-common.scss']
})
export class SglModalComponent {
    @Input() title: string;
    @Input() modalRef: BsModalRef;
}