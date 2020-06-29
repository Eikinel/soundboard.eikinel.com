import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundboardComponent } from "./soundboard/soundboard.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";


const routes: Routes = [
    {
        path: '',
        component: SoundboardComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
        BrowserModule,
        HttpClientModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
