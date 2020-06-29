import { Injectable, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";

@Injectable()
export class ModalService {

    public bsModalRef: BsModalRef;

    constructor(private bsModalService: BsModalService) {
    }

    public openModal(template: TemplateRef<any>, config?: ModalOptions): void {
        this.bsModalRef = this.bsModalService.show(template, config);
    }
}