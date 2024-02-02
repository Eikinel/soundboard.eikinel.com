import { __decorate } from "tslib";
import { Directive, } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TagComponent } from "../components/tag/tag.component";
import { FormControl } from "@angular/forms";
let TagDirective = class TagDirective {
    get element() {
        return this._host.nativeElement;
    }
    get tagsFormArray() {
        return this.controlContainer.control;
    }
    constructor(controlContainer, _vcr, _resolver, _host) {
        this.controlContainer = controlContainer;
        this._vcr = _vcr;
        this._resolver = _resolver;
        this._host = _host;
        this._componentRefs = [];
        this._span = document.createElement("span");
        this._destroyed = new Subject();
        this._factory = this._resolver.resolveComponentFactory(TagComponent);
        this._listeners = {
            ",": () => {
                const tagContents = this.getTagsInputContent();
                if (tagContents?.length) {
                    // Waits for key code to append before creating tag
                    setTimeout(() => {
                        this.getTagsInputContent().forEach((name) => {
                            // Clean already present tag
                            if (!this.tagsFormArray.value.filter((tag) => tag.name === name).length) {
                                this.toTagComponent({ name: name.trim() });
                                this.tagsFormArray.push(new FormControl({ name }));
                            }
                        });
                        this._span.textContent = "";
                    }, 0);
                }
            },
            Backspace: (e) => {
                if (!this._span.textContent.length) {
                    e.preventDefault();
                    if (this._componentRefs.length) {
                        const range = document.createRange();
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
    ngOnInit() {
        const hostClasses = [
            "d-flex",
            "flex-row",
            "flex-wrap",
            "text-break",
        ];
        this._span.classList.add("d-flex", "align-items-center");
        this.element.appendChild(this._span);
        this.element.setAttribute("contenteditable", "true");
        hostClasses.forEach((hostClass) => this.element.classList.add(hostClass));
        fromEvent(this.element, "keydown")
            .pipe(takeUntil(this._destroyed))
            .subscribe((e) => this._listeners[e.key] ? this._listeners[e.key](e) : 0);
        fromEvent(this.element, "blur")
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._listeners[","](null));
    }
    ngAfterViewInit() {
        this.tagsFormArray.value.forEach((tag) => this.toTagComponent(tag));
    }
    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
    getTagsInputContent() {
        return this._span.textContent
            .trim()
            .split(",")
            .filter((s) => s);
    }
    toTagComponent(tag) {
        const componentRef = this._vcr.createComponent(this._factory);
        const element = componentRef.location.nativeElement;
        const styles = {
            width: "fit-content",
            height: "fit-content",
            "word-break": "break-all",
        };
        componentRef.location.nativeElement.setAttribute("contenteditable", "false");
        Object.keys(styles).forEach((property) => (element.style[property] = styles[property]));
        componentRef.instance.name = tag.name;
        componentRef.instance.onDelete.subscribe(() => {
            const index = this._componentRefs.indexOf(componentRef);
            componentRef.destroy();
            this._componentRefs.splice(index, 1);
            this.tagsFormArray.removeAt(index);
        });
        this.element.insertBefore(componentRef.location.nativeElement, this._span);
        this._componentRefs.push(componentRef);
    }
    fromTagComponent() {
        const lastComponentRef = this._componentRefs[this._componentRefs.length - 1];
        const name = lastComponentRef.instance.name.slice();
        lastComponentRef.instance.onDelete.emit();
        return name;
    }
};
TagDirective = __decorate([
    Directive({
        selector: "[appTag]",
    })
], TagDirective);
export { TagDirective };
//# sourceMappingURL=tag.directive.js.map