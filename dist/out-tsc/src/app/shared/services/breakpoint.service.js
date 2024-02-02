import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
let BreakpointService = class BreakpointService {
    constructor() {
        this.innerWidth$ = new BehaviorSubject(window.innerWidth);
        this.innerHeight$ = new BehaviorSubject(window.innerHeight);
        this.widthBreakpoint = 768;
        this._resizeListener = (event) => {
            this.innerWidth$.next(event.target.innerWidth);
            this.innerHeight$.next(event.target.innerHeight);
        };
        window.addEventListener("resize", this._resizeListener);
    }
    ngOnDestroy() {
        window.removeEventListener("resize", this._resizeListener);
    }
};
BreakpointService = __decorate([
    Injectable()
], BreakpointService);
export { BreakpointService };
//# sourceMappingURL=breakpoint.service.js.map