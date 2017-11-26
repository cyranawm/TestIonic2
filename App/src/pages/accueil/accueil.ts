import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestApiServiceProvider } from "../../providers/rest-api-service/rest-api-service";
import { BookingdataProvider } from '../../providers/bookingdata/bookingdata';


import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';
import 'leaflet-routing-machine'
import * as C from '../../assets/typescripts/cluster';
import * as J from '../../assets/typescripts/spot_controllers_java';
declare var L:any;


@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
  providers: [RestApiServiceProvider],
})

export class AccueilPage implements OnInit {
  D = new Date().toISOString();
  d_string =this.D.slice(8,10)+'/'+this.D.slice(5,7)+'/'+this.D.slice(0,4)+' - '+this.D.slice(11,16)

  constructor(public navCtrl: NavController, public restapiService : RestApiServiceProvider,public BookingdataService : BookingdataProvider) {
    setInterval(() => { this.check_booking(); }, 1000);  
  }
  
  ngOnInit(): void {
    // Initialisation des variables utilisées sur la carte 
    var Location_marker = new L.Marker(L.latLng(0,0)).bindPopup("Vous êtes ici");
    var Location_circle = new L.Circle(L.latLng(0,0),0);

    var all_spots;
    var current_pos;
    var spot_statuts;
    this.restapiService.getSpots().subscribe(res => {all_spots = res["spots"]; 
                                                      console.log(all_spots);});
    this.restapiService.getStatuts().subscribe(res => {spot_statuts = res["statuses"];
                                                        console.log(spot_statuts)});

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
    new L.Control.EasyButton({
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
    }).addTo(map)

    /* --------------------- Implémentation bouttons Statioguide --------------------- */
    var cluster_elec = C.create_cluster();
    var cluster_minute = C.create_cluster();
    var cluster_pass = C.create_cluster();

    var flashButton = new L.Control.EasyButton({
      id: 'button1',  
      type: 'replace',
      leafletClasses: true,     
      states: [{
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
    });

    var chronoButton = new L.Control.EasyButton({
      id: 'button2',                            // an id for the generated button
      type: 'replace',                          // set to animate when you're comfy with css
      leafletClasses: true,                     // use leaflet classes to style the button?
      states: [{
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
    });

    var handiButton = new L.Control.EasyButton({
      id: 'button3',                          
      type: 'replace',          
      leafletClasses: true,     
      states: [{
            stateName: 'nohandi',        
            icon:      'fa-wheelchair',   
            title:     'not-handi',      
            onClick: function(btn, map) { 
              J.get_pass(all_spots,cluster_pass,current_pos,spot_statuts);
              map.addLayer(cluster_pass);
              btn.state('handi');    
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

    /*L.easyBar([
      flashButton,
      chronoButton,
      handiButton,
    ]).addTo(map)*/
    flashButton.addTo(map);
    chronoButton.addTo(map);
    handiButton.addTo(map);

  }
  
  check_booking(){
    var temp = J.get_booking();
    this.BookingdataService.update_booking(temp.is_booked,temp.id,temp.address,this.d_string,temp.lat,temp.lng)
  }
}