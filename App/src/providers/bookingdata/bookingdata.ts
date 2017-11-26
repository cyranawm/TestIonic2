import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BookingdataProvider {
  current_booking = {
    is_booked : true,
    spot_id : "",
    adresse : "",
    date : "",
    lat :"",
    lng :"",
  }
  constructor(public http: Http) {
    console.log('Hello BookingdataProvider Provider');
  }

  update_booking(i_b,s_i,ad,d,la,ln){
    this.current_booking.is_booked = i_b;
    this.current_booking.spot_id = s_i;
    this.current_booking.adresse = ad;
    this.current_booking.date =d;
    this.current_booking.lat = la;
    this.current_booking.lng = ln;
  }

	show_booking(){
		console.log(this.current_booking)
	}

}
