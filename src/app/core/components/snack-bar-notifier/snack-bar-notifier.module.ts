import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/shared/shared.module";
import { SnackNotifierComponent } from "./snack-bar-notifier.component";

@NgModule({
    declarations: [
        SnackNotifierComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        FlexLayoutModule
    ],
    exports: [
        SnackNotifierComponent
    ]
})

export class SnackNotifierModule {

}
