import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SoundboardComponent } from "./soundboard/soundboard.component";


const routes: Routes = [
  {
    path: '',
    component: SoundboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [
    SoundboardComponent
  ]
})
export class AppRoutingModule { }
