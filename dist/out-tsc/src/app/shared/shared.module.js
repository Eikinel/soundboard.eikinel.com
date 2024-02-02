import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FileService } from "./services/file.service";
import { BreakpointService } from "./services/breakpoint.service";
import { ReactiveFormsModule } from "@angular/forms";
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [SearchbarComponent],
        imports: [ReactiveFormsModule, FontAwesomeModule],
        providers: [FileService, BreakpointService],
        exports: [SearchbarComponent],
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map