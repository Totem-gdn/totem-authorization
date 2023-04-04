import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPurchase } from './app-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AppPurchase
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPurchaseRoutingModule { }
