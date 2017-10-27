import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingComponent } from './booking';

@NgModule({
  declarations: [
    BookingComponent,
  ],
  imports: [
    IonicPageModule.forChild(BookingComponent),
  ],
  exports: [
    BookingComponent
  ]
})
export class BookingComponentModule {}
