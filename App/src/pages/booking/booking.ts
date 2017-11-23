import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BookingdataProvider } from '../../providers/bookingdata/bookingdata';

import * as J from '../../assets/typescripts/spot_controllers_java';


@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
	
	local_booking:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public BookingDataService : BookingdataProvider,public alertCtrl :AlertController) {
		this.local_booking = this.BookingDataService.current_booking
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad BookingPage');
  }

	cancel_booking(){
		let alert = this.alertCtrl.create({
			title: 'Confirmation',
			message: 'Voulez vous annuler la réservation ?',
			buttons: [
				{
					text: 'Non',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				},
				{
					text: 'Oui',
					handler: () => {
						console.log('Booking deleted');
						this.BookingDataService.update_booking(false,"/","/","/")
						J.cancel_booking();
					}
				}
			]
		});
		alert.present();
	}
	
}
