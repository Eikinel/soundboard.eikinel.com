import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoundboardComponent } from "./soundboard/soundboard.component";
import { CommonModule } from "@angular/common";


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
    SoundboardComponent
  ]
})
export class AppRoutingModule { }
