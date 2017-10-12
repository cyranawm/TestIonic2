import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestApiServiceProvider } from "../../providers/rest-api-service/rest-api-service";
import { Spot } from "../../providers/rest-api-service/spot.ts"

import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';
import * as C from '../../assets/typescripts/cluster';
<<<<<<< HEAD
import * as J from '../../assets/typescripts/spot_controllers_java';
declare var L:any;

=======
import * as S from '../../assets/typescripts/spot_controllers'
import * as J from '../../assets/typescripts/spot_controllers_java'
 
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel

@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  providers: [RestApiServiceProvider],
})

export class AccueilPage implements OnInit {
<<<<<<< HEAD
=======
  urlApi:string = "http://localhost:3000"
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel

  constructor(public navCtrl: NavController, public restapiService : RestApiServiceProvider) {
  }
  
  ngOnInit(): void {
    // Initialisation des variables utilisées sur la carte 
    var Location_marker = new L.Marker(L.latLng(0,0));
    Location_marker.bindPopup("Vous êtes ici");
    var Location_circle = new L.Circle(L.latLng(0,0),0);

    var all_spots;
<<<<<<< HEAD
    var current_pos;
    var spot_statuts;
    this.restapiService.getSpots().subscribe(res => {all_spots = res["spots"]; 
                                                      console.log(all_spots);});
    this.restapiService.getStatuts().subscribe(res => {spot_statuts = res["statuses"];
                                                        console.log(spot_statuts)});
    
=======
    var minute,aine,pass,elec,refresh,route,Libre,tableaumarker=[];
    minute = new L.LayerGroup;
    aine = new L.LayerGroup;
    pass = new L.LayerGroup;
    this.restapiService.getData(this.urlApi+"/spots").subscribe(res => all_spots = res);
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel

    
    /* ------------------------- Initialisation de la carte ------------------------- */
    var map = L.map('map',{zoomControl:false })
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    function onLocationFound(e): void {
      if (map.hasLayer(Location_marker))
        map.removeLayer(Location_marker);
      if (map.hasLayer(Location_circle))
        map.removeLayer(Location_circle);
      var radius = e.accuracy / 2;
      current_pos = e.latlng;
      Location_marker.setLatLng(e.latlng);
      Location_circle.setLatLng(e.latlng).setRadius(radius);
      map.addLayer(Location_marker);
      Location_marker.bindPopup("Vous êtes ici");
      map.addLayer(Location_circle);
    }
      
    function onLocationError(e): void  { 
      alert(e.message);
    }

    map.on('locationfound',onLocationFound);
    map.on('locationerror',onLocationError);
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
    var cluster_elec = C.create_cluster();
    var cluster_minute = C.create_cluster();
    var cluster_pass = C.create_cluster();

    var flashButton = new L.Control.EasyButton({
      id: 'button1',  
      type: 'replace',
      leafletClasses: true,     
      states: [{
<<<<<<< HEAD
          stateName: 'noflash',        
          icon:      'fa-bolt',        
          title:     'not-flash',       
          onClick: function(btn, map) { 
            J.get_elec(all_spots,cluster_elec,current_pos,spot_statuts);
            map.addLayer(cluster_elec);
            btn.state('flash');    
            }
          },{
          stateName: 'flash',
          icon:      'fa-bolt',
          title:     'flash',
          onClick: function(btn, map) {
            cluster_elec.clearLayers();
            map.removeLayer(cluster_elec);
            cluster_elec.removeLayers;
            btn.state('noflash');
            }
          }]
=======
            stateName: 'noflash',        
            icon:      'fa-bolt',        
            title:     'not-flash',       
            onClick: function(btn, map) { 

              J.get_elec(all_spots,cluster_elec);
              map.addLayer(cluster_elec);
              btn.state('flash');    
              }
            },{
            stateName: 'flash',
            icon:      'fa-bolt',
            title:     'flash',
            onClick: function(btn, map) {
              cluster_elec.clearLayers();
              map.removeLayer(cluster_elec);
              cluster_elec.removeLayers;
              btn.state('noflash');
              }
            }]
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel
    });

    var chronoButton = new L.Control.EasyButton({
      id: 'button2',  // an id for the generated button
      type: 'replace',          // set to animate when you're comfy with css
      leafletClasses: true,     // use leaflet classes to style the button?
      states: [{
<<<<<<< HEAD
        stateName: 'nochrono',                  // name the state
        icon:      'fa-clock-o',                // and define its properties
        title:     'not-chrono',                // like its title
        onClick: function(btn, map) { 
          J.get_minute(all_spots,cluster_minute,current_pos,spot_statuts);
          map.addLayer(cluster_minute);              
          btn.state('chrono');                  // change state on click!
          }
        },{
        stateName: 'chrono',
        icon:      'fa-clock-o',
        title:     'chrono',
        onClick: function(btn, map) {
          cluster_minute.clearLayers();
          map.removeLayer(cluster_minute);
          cluster_minute.removeLayers;
          btn.state('nochrono');
        }
      }]
=======
            stateName: 'nochrono',        // name the state
            icon:      'fa-clock-o',               // and define its properties
            title:     'not-chrono',      // like its title
            onClick: function(btn, map) {       // and its callback
              J.get_minute(all_spots,cluster_minute);
              map.addLayer(cluster_minute);              
              btn.state('chrono');    // change state on click!
              }
            },{
            stateName: 'chrono',
            icon:      'fa-clock-o',
            title:     'chrono',
            onClick: function(btn, map) {
              cluster_minute.clearLayers();
              map.removeLayer(cluster_minute);
              cluster_minute.removeLayers;
              btn.state('nochrono');
            }
          }]
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel
    });

    var handiButton = new L.Control.EasyButton({
      id: 'button3',  // an id for the generated button
      type: 'replace',          // set to animate when you're comfy with css
      leafletClasses: true,     // use leaflet classes to style the button?
      states: [{
<<<<<<< HEAD
            stateName: 'nohandi',        
            icon:      'fa-wheelchair',   
            title:     'not-handi',      
            onClick: function(btn, map) { 
              console.log(current_pos)
              J.get_pass(all_spots,cluster_pass,current_pos,spot_statuts);
=======
            stateName: 'nohandi',        // name the state
            icon:      'fa-wheelchair',               // and define its properties
            title:     'not-handi',      // like its title
            onClick: function(btn, map) {       // and its callback
              J.get_pass(all_spots,cluster_pass);
>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel
              map.addLayer(cluster_pass);
              btn.state('handi');    // change state on click!
            }
            },{
            stateName: 'handi',
            icon:      'fa-wheelchair',
            title:     'handi',
            onClick: function(btn, map) {
              cluster_pass.clearLayers();
              map.removeLayer(cluster_pass);
              cluster_pass.removeLayers;
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
<<<<<<< HEAD
    function draw_it(){
      console.log("draw it !")
      var test = new L.Routing.Control({
        waypoints : [
          current_pos,
          L.latLng(57.6792, 11.949),
        ]
      }).addTo(map)
    }
=======
    function onclick(e){
      J.getAllSpots(all_spots)
      
      var spot_data = S.getAllSpots(all_spots);
      console.log(spot_data); 
    }

    map.on('click', onclick); 

    
    
  }
}

  

>>>>>>> parent of a99b1006... Affichage des cluster avec les données en ligne fonctionnel

    map.on('click', draw_it); 
  }
}