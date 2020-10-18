import { NgModule } from "@angular/core";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FileService } from "./services/file.service";
import { BreakpointService } from "./services/breakpoint.service";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [SearchbarComponent],
    imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
    ],
    providers: [
        FileService,
        BreakpointService,
    ],
    exports: [SearchbarComponent],
})
export class SharedModule {
}