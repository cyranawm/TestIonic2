import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as Leaflet from 'leaflet';



@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage implements OnInit {
  Minute_is_pressed: boolean = false;
  Elec_is_pressed:boolean = false;
  Pass_is_pressed:boolean = false;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {
    this.drawMap();
  }
  /*Instructions pour gestion FabButtons*/
  Minute_Pressed(){
    this.Minute_is_pressed=!(this.Minute_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }
  Elec_Pressed(){
    this.Elec_is_pressed=!(this.Elec_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }
  Pass_Pressed(){
    this.Pass_is_pressed=!(this.Pass_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }




  /*Instructions pour affichage carte :*/
  drawMap(): void {
    let map = Leaflet.map('map');
    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGF0cmlja3IiLCJhIjoiY2l2aW9lcXlvMDFqdTJvbGI2eXUwc2VjYSJ9.trTzsdDXD2lMJpTfCVsVuA', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(map);

    //web location
    map.locate({ setView: true});

    //when we have a location draw a marker and accuracy circle
    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      
      Leaflet.marker(e.latlng).addTo(map)
          .bindPopup("You are within " + radius + " meters from this point").openPopup();

      Leaflet.circle(e.latlng, radius).addTo(map);
    }
    map.on('locationfound', onLocationFound);
    
    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    map.on('locationerror', onLocationError);
  }
}
