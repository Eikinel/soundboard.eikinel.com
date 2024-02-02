import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
let ModalService = class ModalService {
    constructor(bsModalService) {
        this.bsModalService = bsModalService;
    }
    openModal(template, config = {}) {
        // Set default properties and override if passed as argument
        Object.assign(config, {
            class: "modal-md",
            animated: true,
            ignoreBackdropClick: true,
        }, config);
        return (this.bsModalRef = this.bsModalService.show(template, config));
    }
};
ModalService = __decorate([
    Injectable()
], ModalService);
export { ModalService };
//# sourceMappingURL=modal.service.js.map