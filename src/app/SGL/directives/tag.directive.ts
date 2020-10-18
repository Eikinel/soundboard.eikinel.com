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
import { ControlContainer, FormArray, FormControl } from "@angular/forms";
import { Tag } from "../../soundboard/shared/models/buttons.model";

@Directive({
    selector: '[appTag]'
})
export class TagDirective implements OnInit, AfterViewInit, OnDestroy {

    private get element(): HTMLDivElement {
        return this._host.nativeElement;
    }

    private get tagsFormArray(): FormArray {
        return this.controlContainer.control as FormArray;
    }

    private _componentRefs: ComponentRef<TagComponent>[] = [];
    private readonly _listeners: { [key: string]: (e: Event) => void };
    private readonly _span: HTMLSpanElement = document.createElement('span');
    private readonly _destroyed: Subject<void> = new Subject<void>();
    private readonly _factory: ComponentFactory<TagComponent>;

    constructor(
        public controlContainer: ControlContainer,
        private _vcr: ViewContainerRef,
        private _resolver: ComponentFactoryResolver,
        private _host: ElementRef<HTMLDivElement>) {
        this._factory = this._resolver.resolveComponentFactory(TagComponent);
        this._listeners = {
            ',': () => {
                const tagContents: string[] = this.getTagsInputContent();

                if (tagContents?.length) {
                    // Waits for key code to append before creating tag
                    setTimeout(() => {
                        this.getTagsInputContent().forEach((name: string) => {
                            // Clean already present tag
                            if (!this.tagsFormArray.value.filter((tag: Tag) => tag.name === name).length) {
                                this.toTagComponent({name});
                                this.tagsFormArray.push(new FormControl({name}));
                            }
                        });
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
        const hostClasses: string[] = ['d-flex', 'flex-row', 'flex-wrap', 'text-break'];

        this._span.classList.add('d-flex', 'align-items-center');
        this.element.appendChild(this._span);
        this.element.setAttribute('contenteditable', 'true');
        hostClasses.forEach((hostClass: string) => this.element.classList.add(hostClass));

        fromEvent(this.element, 'keydown')
            .pipe(takeUntil(this._destroyed))
            .subscribe((e: KeyboardEvent) => this._listeners[e.key] ? this._listeners[e.key](e) : 0);

        fromEvent(this.element, 'blur')
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._listeners[','](null));
    }

    public ngAfterViewInit(): void {
        this.tagsFormArray.value.forEach((tag: Tag) => this.toTagComponent(tag));
    }

    public ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    private getTagsInputContent(): string[] {
        return this._span.textContent.trim().split(',').filter((s: string) => s);
    }

    private toTagComponent(tag: Tag | Partial<Tag>): void {
        const componentRef = this._vcr.createComponent(this._factory);
        const element: HTMLDivElement = componentRef.location.nativeElement;
        const styles: { [property: string]: any } = {
            width: 'fit-content',
            height: 'fit-content',
            'word-break': 'break-all',
        };

        componentRef.location.nativeElement.setAttribute('contenteditable', 'false');
        Object.keys(styles).forEach((property: string) => element.style[property] = styles[property]);
        componentRef.instance.name = tag.name;
        componentRef.instance.onDelete.subscribe(() => {
            const index: number = this._componentRefs.indexOf(componentRef);

            componentRef.destroy();
            this._componentRefs.splice(index, 1);
            this.tagsFormArray.removeAt(index);
        });
        this.element.insertBefore(componentRef.location.nativeElement, this._span);
        this._componentRefs.push(componentRef);
    }

    private fromTagComponent(): string {
        const lastComponentRef: ComponentRef<TagComponent> = this._componentRefs[this._componentRefs.length - 1];
        const name: string = lastComponentRef.instance.name.slice();

        lastComponentRef.instance.onDelete.emit();

        return name;
    }
}