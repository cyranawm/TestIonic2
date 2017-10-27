import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  	book1 : any = {
  		login : 'log',       
	    spot_id : 1,
	    etat : 'libre',
	    time : null,
	    lat : 7.7,
	    lon : 48.5,
	    deviceid : null,
	    modif_date : null,
	}

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log(this.book1)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

}
