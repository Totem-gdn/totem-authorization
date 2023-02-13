import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { SharedModule } from "src/shared/shared.module";
import { BackgroundCircleModule } from "../components/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../components/totem-button/totem-button.module";
import { PaymentSuccessDialogComponent } from "./payment-success-dialog.component";



@NgModule({
  declarations: [
    PaymentSuccessDialogComponent,
  ],
  imports: [
      SharedModule,
      FlexLayoutModule,
      MatProgressBarModule,
      MatDialogModule,
      MatButtonModule,
      MatIconModule,
      MatIconModule,
      MatRippleModule,
      TotemButtonModule,
      BackgroundCircleModule,
  ],
  exports: [
    PaymentSuccessDialogComponent
  ]
})

export class PaymentSuccessDialogModule {

}
