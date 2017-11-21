import { Component, Input, Output,EventEmitter,AfterViewInit} from '@angular/core';

/**
 * Generated class for the BookingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'booking',
  templateUrl: 'booking.html'
})
export class BookingComponent implements AfterViewInit {

 	@Input('resa') book;
      
	  spot_id : string;
	  etat : string;
	  time : string 
	  lat : string;
	  lon : string;
	  it_url : string;

  constructor() {
  	console.log('compo load');
  }

  ngAfterViewInit(){
  	console.log('hello');
  	console.log(this.book);
  	this.spot_id = this.book["spot_id"];
  	this.time = this.book["time"];
  	this.lat = this.book["lat"];
	this.lon =this.book["lon"];
	this.it_url = 'http://maps.apple.com/?ll='+this.lat+','+this.lon+'>';
	document.getElementById("itineraire-button")["href"] = this.it_url;

  }

}
