import { Directive, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
    selector: '[appFormSubmit]'
})
export class FormSubmitDirective {
    public submit$: Observable<Event> = fromEvent(this.element, 'submit')
        .pipe(tap(() => {
            if (this.element.classList.contains('submitted') === false) {
                this.element.classList.add('submitted');
            }
        }), shareReplay(1));

    public get element(): HTMLFormElement {
        return this._host.nativeElement;
    }

    constructor(private _host: ElementRef<HTMLFormElement>) {}
}