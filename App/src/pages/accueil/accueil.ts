import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster'

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  
  
})
export class AccueilPage implements OnInit {

  constructor(public navCtrl: NavController) {

  }
  
  ngOnInit(): void {
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
      id: 'id-for-the-button',  
      position: 'bottomright',     
      type: 'replace',          
      leafletClasses: true,     
      states:[{                 
        stateName: 'get-center',
        onClick: function(btn, map){
          map.locate({setView:true, maxZoom: 16})
          },
        title: 'show me the middle',
        icon: 'fa-crosshairs'
      }]
    }); 

    locate_button.addTo(map);


    /* --------------------- Implémentation bouttons Statioguide --------------------- */
    /* L'idée est d'initialiser les clusters ici .... */
    /* Aller voir la fonction /Users/Lucas/Documents/Mines/Divers/JE/TestIonic2/Web/app/assets/javascripts/Clusters/Clusters.js */
    var c_marker_flash = L.markerClusterGroup({
      polygonOptions: {
          fillColor: '#3887be',
          color: '#3887be',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.5
        },disableClusteringAtZoom: 18,
     iconCreateFunction: function (cluster) {
      var childMarkers = cluster.getAllChildMarkers();
      return L.divIcon({ html: "<p> Test </p>",className: "marker-cluster marker-cluster-green",  iconSize: L.point(40, 40)});
     },
    });

    var randomMarkers = L.layerGroup([
    L.marker([37.8, -110]), L.marker([38.8, -86]), L.marker([47.8, -106]),
    L.marker([31.8, -120]), L.marker([39.8, -96]), L.marker([33.8, -100]) ]);

    var flashButton = new L.Control.EasyButton({
      id: 'button1',  
      type: 'replace',
      leafletClasses: true,     
      states: [{
            stateName: 'noflash',        
            icon:      'fa-bolt',        
            title:     'not-flash',       
            onClick: function(btn, map) { 
              /* Et de les remplir ici, ca permet de prendre que les places à moins de 20km */
              c_marker_flash.addLayer(randomMarkers);
              map.addLayer(c_marker_flash);
              btn.state('flash');    
              }
            },{
            stateName: 'flash',
            icon:      'fa-bolt',
            title:     'flash',
            onClick: function(btn, map) {
              map.removeLayer(c_marker_flash);
              c_marker_flash.removeLayers;
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
            },{
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
            },{
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

    /*var marker;
    function test(e):void  {
      if (marker) { // check
          map.removeLayer(marker); // remove
      }
      marker = new L.Marker(e.latlng ); // set
      map.addLayer(marker);  
    }
    map.on('click',test); */  
  }
}

  


