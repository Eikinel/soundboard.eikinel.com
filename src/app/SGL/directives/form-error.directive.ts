import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  Optional,
  SkipSelf,
  ViewContainerRef,
} from "@angular/core";
import { NgControl, ValidationErrors } from "@angular/forms";
import { ControlErrorComponent } from "../components/control-error.component";
import { EMPTY, merge, Observable } from "rxjs";
import { FormSubmitDirective } from "./form-submit.directive";

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: "input",
})
export class FormErrorDirective implements OnInit {
  @Input() customErrors: object = {};

  public componentRef: ComponentRef<ControlErrorComponent>;
  public submit$: Observable<Event>;

  private _element: HTMLElement;
  private _commonErrors: { [error: string]: string } = {
    required: "This field is required",
  };

  constructor(
    private _controlDir: NgControl,
    private _vcr: ViewContainerRef,
    private _resolver: ComponentFactoryResolver,
    @Optional() @SkipSelf() private _form: FormSubmitDirective,
  ) {
    this.submit$ = this._form ? this._form.submit$ : EMPTY;
    this._element = (
      this._vcr.element as ElementRef<HTMLElement>
    ).nativeElement;
  }

  public ngOnInit(): void {
    merge(this.submit$, this._controlDir.valueChanges).subscribe((_: any) => {
      const controlErrors: ValidationErrors = this._controlDir.control.errors;

      if (!controlErrors) return this.setError(null);

      Object.entries(controlErrors).forEach((v: [string, any]) => {
        const error = v[0];
        const text = this.customErrors[error] || this._commonErrors[error];

        this.setError(text);
        this._element.classList.add("error");
      });
    });
  }

  private setError(text: string): void {
    if (!this.componentRef) {
      const factory: ComponentFactory<ControlErrorComponent> =
        this._resolver.resolveComponentFactory(ControlErrorComponent);
      this.componentRef = this._vcr.createComponent(factory);
    }

    this.componentRef.instance.text = text;
    if (!text) this._element.classList.remove("error");
  }
}
