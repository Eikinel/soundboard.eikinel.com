import { Component, Input } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FormControl } from "@angular/forms";

@Component({
    selector: 'app-searchbar',
    templateUrl: './searchbar.component.html',
    styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
    @Input() searchControl: FormControl;

    public readonly faSearch: IconDefinition = faSearch;
}