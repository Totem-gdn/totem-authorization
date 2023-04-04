import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppPurchase } from './components/app-purchase/app-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', loadChildren: () => import('./components/app-auth/app-auth.module').then(m => m.AppAuthModule) },
      { path: 'app-purchase', loadChildren: () => import('./components/app-purchase/app-purchase.module').then(m => m.AppPurchaseModule) },
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
