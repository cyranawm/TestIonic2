import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestApiServiceProvider } from "../../providers/rest-api-service/rest-api-service";
import { Spot } from "../../providers/rest-api-service/spot.ts"

import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';
import * as C from '../../assets/typescripts/cluster';
import * as S from '../../assets/typescripts/spot_controllers'
 

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  providers: [RestApiServiceProvider],
})

export class AccueilPage implements OnInit {
  urlApi:string = "http://localhost:3000"

  constructor(public navCtrl: NavController, public restapiService : RestApiServiceProvider) {
  }
  
  ngOnInit(): void {
    // Initialisation des variables utilisées sur la carte 
    var all_spots;
    this.restapiService.getData(this.urlApi+"/spots").subscribe(res => all_spots = res);


    
    /* ------------------------- Initialisation de la carte ------------------------- */
    var map = L.map('map',{zoomControl:false })
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    function onLocationFound(e): void {
      var radius = e.accuracy / 2;
      var Location_marker = new L.Marker(e.latlng);
      var Location_circle = new L.Circle(e.latlng,radius);
      map.addLayer(Location_marker);
      Location_marker.bindPopup("Vous êtes ici");
      map.addLayer(Location_circle);
    }
      
    function onLocationError(e): void  { 
      alert(e.message);
    }

    map.on('locationfound',onLocationFound);
    map.locate({setView:true, maxZoom: 16}) 


    /* ------------------- Implémentation boutton géolocalisation ------------------- */
    var locate_button = new L.Control.EasyButton({
      id: 'locate_button',  
      position: 'bottomright',     
      type: 'replace',          
      leafletClasses: true,     
      states:[{                 
        stateName: 'get-center',
        onClick: function(btn, map){
          map.locate({setView:true, maxZoom: 16})
          },
        title: 'geolocate me',
        icon: 'fa-crosshairs'
      }]
    }); 

    locate_button.addTo(map);

    /* --------------------- Implémentation bouttons Statioguide --------------------- */
    var test_markers = L.layerGroup([
    L.marker([48.53228665699862,7.72891402244568]),
    L.marker([48.532130355277786,7.7288925647735605]),
    L.marker([48.53212325064263,7.728538513183595]),
    L.marker([48.532265343156006,7.728549242019654]),
    ]);
    
    var cluster_flash = C.create_cluster();

    var flashButton = new L.Control.EasyButton({
      id: 'button1',  
      type: 'replace',
      leafletClasses: true,     
      states: [{
            stateName: 'noflash',        
            icon:      'fa-bolt',        
            title:     'not-flash',       
            onClick: function(btn, map) { 
              S.createSpotsMarkers(all_spots,cluster_flash);
              map.addLayer(cluster_flash);
              btn.state('flash');    
              }
            },{
            stateName: 'flash',
            icon:      'fa-bolt',
            title:     'flash',
            onClick: function(btn, map) {
              cluster_flash.clearLayers();
              map.removeLayer(cluster_flash);
              cluster_flash.removeLayers;
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
              map.addLayer(test_markers);
              btn.state('chrono');    // change state on click!
              }
            },{
            stateName: 'chrono',
            icon:      'fa-clock-o',
            title:     'chrono',
            onClick: function(btn, map) {
                map.setView([42.3748204,-71.1161913],16);
                map.removeLayer(test_markers);
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
              map.addLayer(test_markers);
              btn.state('handi');    // change state on click!
            }
            },{
            stateName: 'handi',
            icon:      'fa-wheelchair',
            title:     'handi',
            onClick: function(btn, map) {
              map.setView([42.3748204,-71.1161913],16);
              map.removeLayer(test_markers);
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

    /* --- Get data on click --- */ 
    function onclick(e){
      var spot_data = S.getAllSpots(all_spots);
      console.log(spot_data); 
    }

    map.on('click', onclick); 

    
    
  }
}

  


