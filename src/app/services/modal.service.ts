import { Component, Injectable, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService, ModalOptions } from "ngx-bootstrap/modal";

@Injectable()
export class ModalService {

    public bsModalRef: BsModalRef;

    constructor(private bsModalService: BsModalService) {
    }

    public openModal(template: TemplateRef<any> | any, config: ModalOptions = {}): BsModalRef {
        // Set default properties and override if passed as argument
        Object.assign(config, {
            class: 'modal-md',
            animated: true,
            ignoreBackdropClick: true
        }, config);

        return this.bsModalRef = this.bsModalService.show(template, config);
    }
}