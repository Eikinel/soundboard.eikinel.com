import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoundboardComponent } from "./soundboard/soundboard.component";
import { CommonModule } from "@angular/common";
import { SoundboardToolbarComponent } from "./soundboard/soundboard-toolbar/soundboard-toolbar.component";
import { SoundboardButtonComponent } from "./soundboard/soundboard-button/soundboard-button.component";
import { SoundboardService } from "./soundboard/soundboard.service";


const routes: Routes = [
    {
        path: '',
        component: SoundboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), CommonModule],
    exports: [RouterModule],
    declarations: [
        SoundboardComponent,
        SoundboardButtonComponent,
        SoundboardToolbarComponent
    ],
    providers: [
        SoundboardService
    ]
})
export class AppRoutingModule {
}
