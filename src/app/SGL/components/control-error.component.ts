import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
    template: `<p class="text-danger mt-1 mb-0" [class.d-none]="hide">{{ error }}</p>`,
    styles: [`p { font-size: 12px }`],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
    public error: string;
    public hide = true;

    @Input() set text(value) {
        if (value !== this.error) {
            this.error = value;
            this.hide = !value;
            this.cdr.detectChanges();
        }
    }

    constructor(private cdr: ChangeDetectorRef) { }

}