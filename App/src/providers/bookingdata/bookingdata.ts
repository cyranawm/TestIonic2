import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookingdataProvider {
  current_booking = {
    is_booked : false,
    spot_id : "",
    adresse : "",
    date : ""
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
