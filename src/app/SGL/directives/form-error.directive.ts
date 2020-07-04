import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Host,
    Input,
    OnInit, Optional, SkipSelf,
    ViewContainerRef
} from "@angular/core";
import { NgControl, ValidationErrors } from "@angular/forms";
import { ControlErrorComponent } from "../components/control-error.component";
import { EMPTY, merge, Observable } from "rxjs";
import { FormSubmitDirective } from "./form-submit.directive";

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'input'
})
export class FormErrorDirective implements OnInit {
    @Input() customErrors: object = {};

    public componentRef: ComponentRef<ControlErrorComponent>;
    public submit$: Observable<Event>;

    private _commonErrors: { [error: string]: string } = {
        required: 'This field is required',
    };

    constructor(
        private controlDir: NgControl,
        private vcr: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        @Optional() @SkipSelf() private form: FormSubmitDirective) {
        this.submit$ = this.form ? this.form.submit$ : EMPTY;
        console.log(this.form.element);
    }

    public ngOnInit(): void {
        merge(
            this.submit$,
            this.controlDir.valueChanges
        ).subscribe((_: string) => {
            const controlErrors: ValidationErrors = this.controlDir.control.errors;

            if (!controlErrors) return this.setError(null);

            Object.entries(controlErrors).forEach((v: [string, any]) => {
                const error = v[0];
                const text = this.customErrors[error] || this._commonErrors[error];

                this.setError(text);
            });
        });
    }

    public setError(text: string): void {
        if (!this.componentRef) {
            const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
            this.componentRef = this.vcr.createComponent(factory);
        }

        this.componentRef.instance.text = text;
    }
}