import { __decorate } from "tslib";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SoundboardComponent } from "./soundboard/soundboard.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
const routes = [
    {
        path: "",
        component: SoundboardComponent,
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes),
            CommonModule,
            BrowserModule,
            HttpClientModule,
        ],
        exports: [RouterModule],
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map