import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BreakpointService implements OnDestroy {
  public innerWidth$: BehaviorSubject<number> = new BehaviorSubject<number>(
    window.innerWidth,
  );
  public innerHeight$: BehaviorSubject<number> = new BehaviorSubject<number>(
    window.innerHeight,
  );
  public widthBreakpoint: number = 768;

  private readonly _resizeListener: (event: Event) => void;

  constructor() {
    this._resizeListener = (event: Event) => {
      this.innerWidth$.next((event.target as Window).innerWidth);
      this.innerHeight$.next((event.target as Window).innerHeight);
    };
    window.addEventListener("resize", this._resizeListener);
  }

  public ngOnDestroy(): void {
    window.removeEventListener("resize", this._resizeListener);
  }
}
