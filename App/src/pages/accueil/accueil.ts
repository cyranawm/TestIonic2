import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import 'leaflet';
import 'leaflet-easybutton';

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  
  
})
export class AccueilPage implements OnInit {
  Minute_is_pressed: boolean = false;
  Elec_is_pressed:boolean = false;
  Pass_is_pressed:boolean = false;
  Locate_is_pressed:boolean = false;


  constructor(public navCtrl: NavController) {

  }
  
  ngOnInit(): void {
    var Location_marker:L.Marker;
    var Location_circle:L.Circle;

    var map = L.map('map',{zoomControl:false })
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    L.easyButton('fa-bandcamp', function(btn,map) {
      if (Location_marker) {
        map.removeLayer(Location_marker);
        map.removeLayer(Location_circle);
      }
      map.locate({setView:true, maxZoom: 16})
    }).addTo( map );

    function onLocationFound(e): void {
      var radius = e.accuracy / 2;
      Location_marker = new L.Marker(e.latlng);
      Location_circle = new L.Circle(e.latlng,radius);
      map.addLayer(Location_marker);
      map.addLayer(Location_circle);
    }
      
    function onLocationError(e): void  { 
      alert(e.message);
    }


    var marker;
    

    function test(e):void  {
      if (marker) { // check
          map.removeLayer(marker); // remove
      }
      marker = new L.Marker(e.latlng ); // set
      map.addLayer(marker);  
    };
  
    map.on('click',test); 


    map.on('locationfound',onLocationFound);
    map.locate({setView:true, maxZoom: 16})  
  
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
}


