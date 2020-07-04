import { Directive, ElementRef, Host, OnInit } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { FormErrorDirective } from "./form-error.directive";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appFormSubmit]'
})
export class FormSubmitDirective {
    public submit$: Observable<Event> = fromEvent(this.element, 'submit')
        .pipe(tap(() => {
            if (this.element.classList.contains('submitted') === false) {
                this.element.classList.add('submitted');
            }
        }), shareReplay(1));

    constructor(private _host: ElementRef<HTMLFormElement>) {}

    get element(): HTMLFormElement {
        return this._host.nativeElement;
    }
}