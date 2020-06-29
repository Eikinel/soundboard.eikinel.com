import { NgModule } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        InputComponent,
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        InputComponent,
    ]
})
export class ComponentsModule {
}