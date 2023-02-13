import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TotemSpinnerModule } from "./totem-spinner/totem-spinner.module";

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        TotemSpinnerModule,
        FormsModule,
        RouterModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        TotemSpinnerModule,
        FormsModule,
        RouterModule
    ]
})

export class SharedModule {

}