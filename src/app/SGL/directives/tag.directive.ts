import {
    AfterViewInit,
    ComponentFactory,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewContainerRef
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TagComponent } from "../components/tag/tag.component";

@Directive({
    selector: '[appTag]'
})
export class TagDirective implements OnInit, AfterViewInit, OnDestroy {

    private get element(): HTMLDivElement {
        return this._host.nativeElement;
    }

    private _componentRefs: ComponentRef<TagComponent>[] = [];
    private readonly _listeners: { [key: string]: (e: Event) => void };
    private readonly _span: HTMLSpanElement = document.createElement('span');
    private readonly _destroyed: Subject<void> = new Subject<void>();
    private readonly _factory: ComponentFactory<TagComponent>;

    constructor(
        private _vcr: ViewContainerRef,
        private _resolver: ComponentFactoryResolver,
        private _host: ElementRef<HTMLDivElement>)
    {
        this._factory = this._resolver.resolveComponentFactory(TagComponent);
        this._listeners = {
            ',': () => {
                const tagContents: string[] = this.getTagsInputContent();

                if (tagContents?.length) {
                    // Waits for key code to append before creating tag
                    setTimeout(() => {
                        this.getTagsInputContent().forEach((tag: string) => this.toTagComponent(tag));
                        this._span.textContent = '';
                    }, 0);
                }
            },
            Backspace: (e: Event) => {
                if (!this._span.textContent.length) {
                    e.preventDefault();

                    if (this._componentRefs.length) {
                        const range: Range = document.createRange();
                        const selection = window.getSelection();

                        this._span.textContent = this.fromTagComponent();
                        // Move cursor to the end of the span (prevent default)
                        range.selectNodeContents(this._span);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            },
        };
    }

    public ngOnInit(): void {
        this._span.classList.add('d-flex', 'align-items-center');
        this.element.appendChild(this._span);
        this.element.setAttribute('contenteditable', 'true');

        fromEvent(this.element, 'keydown')
            .pipe(takeUntil(this._destroyed))
            .subscribe((e: KeyboardEvent) => this._listeners[e.key] ? this._listeners[e.key](e) : 0);
    }

    public ngAfterViewInit(): void {
        this.getTagsInputContent().forEach((tag: string) => this.toTagComponent(tag));
    }

    public ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private getTagsInputContent(): string[] {
        return this._span.textContent.trim().split(',').filter((s: string) => s);
    }

    private toTagComponent(name: string): void {
        const componentRef = this._vcr.createComponent(this._factory);
        const element: HTMLDivElement = componentRef.location.nativeElement;
        const styles: { [property: string]: any } = {
            width: 'fit-content',
            height: 'fit-content',
            'word-break': 'break-all',
        };

        componentRef.location.nativeElement.setAttribute('contenteditable', 'false');
        Object.keys(styles).forEach((property: string) => element.style[property] = styles[property]);
        componentRef.instance.name = name;
        componentRef.instance.onDelete.subscribe(() => componentRef.destroy());
        this.element.insertBefore(componentRef.location.nativeElement, this._span);
        this._componentRefs.push(componentRef);
    }

    private fromTagComponent(): string {
        const lastComponentRef: ComponentRef<TagComponent> = this._componentRefs.pop();
        const name: string = lastComponentRef.instance.name.slice();

        lastComponentRef.instance.onDelete.emit();

        return name;
    }
}