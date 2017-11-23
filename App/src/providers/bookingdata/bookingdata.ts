import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the BookingdataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BookingdataProvider {
  current_booking = {
    is_booked : true,
    spot_id : 1,
    adresse : "2 rue de la Rheimatt",
    date : "22/11/2017"
  }
  constructor(public http: Http) {
    console.log('Hello BookingdataProvider Provider');
  }

  update_booking(i_b,s_i,ad,d){
    this.current_booking.is_booked = i_b;
    this.current_booking.spot_id = s_i;
    this.current_booking.adresse = ad;
    this.current_booking.date =d;
  }

	show_booking(){
		console.log(this.current_booking)
	}

}
