import { NgModule } from "@angular/core";
import { WelcomeDialogComponent } from "./welcome-dialog.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { TotemButtonModule } from "../components/totem-button/totem-button.module";
import { SharedModule } from "src/shared/shared.module";
import { CommonModule } from "@angular/common";
import { TotemSpinnerModule } from "src/shared/totem-spinner/totem-spinner.module";

@NgModule({
  declarations: [
    WelcomeDialogComponent,
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    MatRippleModule,
    CommonModule,
    TotemButtonModule,
    TotemSpinnerModule
  ],
  exports: [
    WelcomeDialogComponent
  ]
})

export class WelcomeDialogModule {

}
