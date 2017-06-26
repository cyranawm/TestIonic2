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

    var randomMarkers = L.layerGroup([
      L.marker([37.8, -110]), L.marker([38.8, -86]), L.marker([47.8, -106]),
      L.marker([31.8, -120]), L.marker([39.8, -96]), L.marker([33.8, -100]) ]);

    

    var flashButton = new L.Control.EasyButton({
      id: 'button1',  // an id for the generated button
      type: 'replace',          // set to animate when you're comfy with css
      leafletClasses: true,     // use leaflet classes to style the button?
      states: [{
            stateName: 'noflash',        // name the state
            icon:      'fa-bolt',               // and define its properties
            title:     'not-flash',      // like its title
            onClick: function(btn, map) {       // and its callback
                map.setView([46.25,-121.8],10);
                map.addLayer(randomMarkers);
                btn.state('flash');    // change state on click!
            }
        }, {
            stateName: 'flash',
            icon:      'fa-bolt',
            title:     'flash',
            onClick: function(btn, map) {
                map.setView([42.3748204,-71.1161913],16);
                map.removeLayer(randomMarkers);
                btn.state('noflash');
            }
    }]
    });

    var chronoButton = new L.Control.EasyButton({
      id: 'button2',  // an id for the generated button
      type: 'replace',          // set to animate when you're comfy with css
      leafletClasses: true,     // use leaflet classes to style the button?
      states: [{
            stateName: 'nochrono',        // name the state
            icon:      'fa-clock-o',               // and define its properties
            title:     'not-chrono',      // like its title
            onClick: function(btn, map) {       // and its callback
                map.setView([46.25,-121.8],10);
                map.addLayer(randomMarkers);
                btn.state('chrono');    // change state on click!
            }
        }, {
            stateName: 'chrono',
            icon:      'fa-clock-o',
            title:     'chrono',
            onClick: function(btn, map) {
                map.setView([42.3748204,-71.1161913],16);
                map.removeLayer(randomMarkers);
                btn.state('nochrono');
            }
    }]
    });


    var handiButton = new L.Control.EasyButton({
      id: 'button3',  // an id for the generated button
      type: 'replace',          // set to animate when you're comfy with css
      leafletClasses: true,     // use leaflet classes to style the button?
      states: [{
            stateName: 'nohandi',        // name the state
            icon:      'fa-wheelchair',               // and define its properties
            title:     'not-handi',      // like its title
            onClick: function(btn, map) {       // and its callback
                map.setView([46.25,-121.8],10);
                map.addLayer(randomMarkers);
                btn.state('handi');    // change state on click!
            }
        }, {
            stateName: 'handi',
            icon:      'fa-wheelchair',
            title:     'handi',
            onClick: function(btn, map) {
                map.setView([42.3748204,-71.1161913],16);
                map.removeLayer(randomMarkers);
                btn.state('nohandi');
            }
    }]
    });

    var buttonBar = L.easyBar([
      flashButton,
      chronoButton,
      handiButton,
      ])

    buttonBar.addTo( map );








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


    /*var marker;
    

    function test(e):void  {
      if (marker) { // check
          map.removeLayer(marker); // remove
      }
      marker = new L.Marker(e.latlng ); // set
      map.addLayer(marker);  
    };
  
    map.on('click',test); */


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

  


