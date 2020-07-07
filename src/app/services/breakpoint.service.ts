import { Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class BreakpointService implements OnDestroy {
    public get innerWidth(): number {
        return this._innerWidth;
    }
    public widthBreakpoint: number = 768;

    private _innerWidth: number;
    private readonly _resizeListener: (event: Event) => void;

    constructor() {
        this._innerWidth = window.innerWidth;
        this._resizeListener = (event: Event) => {
            this._innerWidth = (event.target as Window).innerWidth;
        };
        window.addEventListener('resize', this._resizeListener);
    }

    public ngOnDestroy(): void {
        window.removeEventListener('resize', this._resizeListener);
    }
}