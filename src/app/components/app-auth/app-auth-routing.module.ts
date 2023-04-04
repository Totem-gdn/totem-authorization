import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAuth } from './app-auth.component';

const routes: Routes = [
  {
    path: '',
    component: AppAuth
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppAuthRoutingModule { }
