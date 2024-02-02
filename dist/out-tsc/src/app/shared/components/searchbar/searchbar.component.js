import { __decorate } from "tslib";
import { Component, Input } from "@angular/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
let SearchbarComponent = class SearchbarComponent {
    constructor() {
        this.faSearch = faSearch;
    }
};
__decorate([
    Input()
], SearchbarComponent.prototype, "searchControl", void 0);
SearchbarComponent = __decorate([
    Component({
        selector: "app-searchbar",
        templateUrl: "./searchbar.component.html",
        styleUrls: ["./searchbar.component.scss"],
    })
], SearchbarComponent);
export { SearchbarComponent };
//# sourceMappingURL=searchbar.component.js.map