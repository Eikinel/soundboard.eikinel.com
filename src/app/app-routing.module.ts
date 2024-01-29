import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { SoundboardComponent } from "./modules/soundboard.component";

const routes: Routes = [
  {
    path: "",
    component: SoundboardComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    CommonModule,
    BrowserModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
