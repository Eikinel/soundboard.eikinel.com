import { __decorate, __param } from "tslib";
import { Directive, Input, Optional, SkipSelf, } from "@angular/core";
import { ControlErrorComponent } from "../components/control-error.component";
import { EMPTY, merge } from "rxjs";
let FormErrorDirective = class FormErrorDirective {
    constructor(_controlDir, _vcr, _resolver, _form) {
        this._controlDir = _controlDir;
        this._vcr = _vcr;
        this._resolver = _resolver;
        this._form = _form;
        this.customErrors = {};
        this._commonErrors = {
            required: "This field is required",
        };
        this.submit$ = this._form ? this._form.submit$ : EMPTY;
        this._element = this._vcr.element.nativeElement;
    }
    ngOnInit() {
        merge(this.submit$, this._controlDir.valueChanges).subscribe((_) => {
            const controlErrors = this._controlDir.control.errors;
            if (!controlErrors)
                return this.setError(null);
            Object.entries(controlErrors).forEach((v) => {
                const error = v[0];
                const text = this.customErrors[error] || this._commonErrors[error];
                this.setError(text);
                this._element.classList.add("error");
            });
        });
    }
    setError(text) {
        if (!this.componentRef) {
            const factory = this._resolver.resolveComponentFactory(ControlErrorComponent);
            this.componentRef = this._vcr.createComponent(factory);
        }
        this.componentRef.instance.text = text;
        if (!text)
            this._element.classList.remove("error");
    }
};
__decorate([
    Input()
], FormErrorDirective.prototype, "customErrors", void 0);
FormErrorDirective = __decorate([
    Directive({
        // tslint:disable-next-line:directive-selector
        selector: "input",
    }),
    __param(3, Optional()),
    __param(3, SkipSelf())
], FormErrorDirective);
export { FormErrorDirective };
//# sourceMappingURL=form-error.directive.js.map