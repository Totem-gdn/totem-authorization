import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppPurchaseRoutingModule } from './app-purchase-routing.module';
import { AppPurchase } from './app-purchase.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppPurchase
  ],
  imports: [
    CommonModule,
    AppPurchaseRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  providers: [],
})
export class AppPurchaseModule { }
