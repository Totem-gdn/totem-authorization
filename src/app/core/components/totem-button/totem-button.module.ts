import { NgModule } from '@angular/core';

// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { TotemButtonComponent } from './totem-button.component';
import {MatRippleModule} from '@angular/material/core';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    TotemButtonComponent
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    MatRippleModule
  ],
  exports: [
    TotemButtonComponent
  ],
  providers: [],
})
export class TotemButtonModule {}
