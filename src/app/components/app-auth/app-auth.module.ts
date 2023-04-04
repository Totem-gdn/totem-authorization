import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppAuth } from './app-auth.component';
import { AppAuthRoutingModule } from './app-auth-routing.module';
import { SnackNotifierModule } from 'src/app/core/components/snack-bar-notifier/snack-bar-notifier.module';
import { PaymentSuccessDialogModule } from 'src/app/core/payment-success-dialog/payment-success-dialog.module';
import { WelcomeDialogModule } from 'src/app/core/welcome-dialog/welcome-dialog.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppAuth
  ],
  imports: [
    CommonModule,
    AppAuthRoutingModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    WelcomeDialogModule,
    PaymentSuccessDialogModule,
    SnackNotifierModule
  ],
  providers: [],
})
export class AppAuthModule { }
