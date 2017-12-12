import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';
import 'leaflet-routing-machine';
import { BookingdataProvider } from "../../providers/bookingdata/bookingdata";
import * as $ from 'jquery'

var my_booking = {is_booked : false,id : "",address : "",lat :"",lng:""};


export function get_booking(){
  return my_booking
}

export function cancel_booking(){
  console.log("Booking canceled locally")
  my_booking = {is_booked : false,id : "",address : "",lat :"",lng:""};
}

//Fonction pour recuperer les spots en bdd

export function getAllSpots(data,pos){
  var spots = new Array();
  for(var index in data){  
    if ((data[index]["location"]["gps"]["latitude"] != null) && (data[index]["location"]["address"] != "non installé") ) {
      var d = get_distance_m(data[index]["location"]["gps"]["latitude"], data[index]["location"]["gps"]["longitude"],pos.lat,pos.lng)    
        spots.push({
          "lat" : data[index]["location"]["gps"]["latitude"],
          "lng" : data[index]["location"]["gps"]["longitude"],
          "id" : data[index]["id"],
          "type_spot" : data[index]["spot_type"],
          "address" : data[index]["location"]["address"],
          "city" : data[index]["location"]["town"],
          "links" : data[index]["links"]["device"]["href"],
          "dist" : d
        });     
    }
  }
  return(spots)
};

export function getAllStatuts(data){
  var statuts = new Array();
  for (var index in data){
    if (data[index]["vehicle_detected"] != undefined ){
      statuts.push({
        "vehicle_detected": data[index]["vehicle_detected"]["value"],
        "connected": data[index]["connected"]["value"],
      })
    }
    else{
      statuts.push({
        "vehicle_detected": 0,
        "connected": 1,
      })
    }
  }
  return statuts;
}








//fonction d'implementation des spots
export function get_minute(data,cluster,pos,stat){
  console.log("Minute called")
  var spots = getAllSpots(data,pos);
  var statuts = getAllStatuts(stat);

  var LibreMinute = L.icon({
      iconUrl : 'assets/images/borne_libre_statiominute.png',
      iconAnchor: [10, 48],
      popupAnchor:  [0, -50] 
    });
  var OccupeMinute = L.icon({
    iconUrl : 'assets/images/borne_occupe_statiominute.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });
  
  var DecoMinute = L.icon({
    iconUrl : 'assets/images/borne_veille_statiominute.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });

  for (var k in spots){
    if ((spots[k].type_spot == "Statio'Minute") && (spots[k].dist <= 10000) ){

      var popi = L.popup();

      if(statuts[k].connected ==0){
        var Icone=DecoMinute;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Indisponible', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);

      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupeMinute;
        var etat="Occupé";
        var statecluster="occupe"


        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Place occupée', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);

      }
      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibreMinute;
        var etat="Libre";
        var statecluster="libre";
        var k_local = k;

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          ItBtn = createButton('Itinéraire', container),
          BookBtn = createButton('Réserver', container);

        L.DomEvent.on(BookBtn, 'click', function(){
          if (!my_booking.is_booked){
            my_booking.is_booked = true;
            my_booking.id = spots[k_local].id;
            my_booking.address = spots[k_local].address;
            my_booking.lat = spots[k_local].lat;
            my_booking.lng= spots[k_local].lng;
            BookBtn.innerHTML = "Annuler";
            BookBtn.style.backgroundColor = "#d34836";
            BookBtn.style.color = "white";            
            $(".leaflet-popup-close-button")[0].click();          

          }
          else {
            cancel_booking();
            $(".leaflet-popup-close-button")[0].click();      
            BookBtn.innerHTML = "Réserver";
            BookBtn.style.backgroundColor = "#488aff";
            BookBtn.style.color = "white";
          }
        });

        L.DomEvent.on(ItBtn, 'click', function(){
          window.location.href = 'http://maps.apple.com/?ll='+spots[k].lat+','+spots[k].lng;
        });

        popi.setContent(container);
      }

      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup(popi)
        .openPopup();
      cluster.addLayer(marker)
    }
  }
}







export function get_elec(data, cluster,pos,stat){
  console.log("Elec called")
  var spots = getAllSpots(data,pos);
  var statuts = getAllStatuts(stat);
  
  //Declaration des différentes images
  var Libre = L.icon({
    iconUrl: 'assets/images/borne_libre.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });
  var LibreElec = L.icon({
    iconUrl: 'assets/images/borne_libre_statioelec.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50]  
  });

  var OccupeElec = L.icon({
    iconUrl: 'assets/images/borne_occupe_statioelec.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50]  
  });

  var DecoElec = L.icon({
    iconUrl: 'assets/images/borne_veille_statioelec.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });

  for (var k in spots){
    if ((spots[k].type_spot == "Statio'Elec") && (spots[k].dist <= 10000)){

      var popi = L.popup();

      if(statuts[k].connected ==0){
        var Icone=DecoElec;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        
        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Indisponible', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);
      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupeElec;
        var etat="Occupé";
        var statecluster="occupe";

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Place occupée', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);
      }

      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibreElec;
        var etat="Libre";
        var statecluster="libre";
        var k_local = k;

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          ItBtn = createButton('Itinéraire', container),
          BookBtn = createButton('Réserver', container);

        L.DomEvent.on(BookBtn, 'click', function(){
          if (!my_booking.is_booked){
            my_booking.is_booked = true;
            my_booking.id = spots[k_local].id;
            my_booking.address = spots[k_local].address;
            my_booking.lat = spots[k_local].lat;
            my_booking.lng= spots[k_local].lng;
            BookBtn.innerHTML = "Annuler";
            BookBtn.style.backgroundColor = "#d34836";
            BookBtn.style.color = "white";            
            $(".leaflet-popup-close-button")[0].click();          

          }
          else {
            cancel_booking();
            $(".leaflet-popup-close-button")[0].click();      
            BookBtn.innerHTML = "Réserver";
            BookBtn.style.backgroundColor = "#488aff";
            BookBtn.style.color = "white";
          }
        });

        L.DomEvent.on(ItBtn, 'click', function(){
          window.location.href = 'http://maps.apple.com/?ll='+spots[k].lat+','+spots[k].lng;
        });

        popi.setContent(container);
      }

      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup(popi)
        .openPopup();
      cluster.addLayer(marker)
    }
  }
}










export function get_pass(data,cluster,pos,stat){
  console.log("Pass called")
  var spots = getAllSpots(data,pos);
  var statuts = getAllStatuts(stat);
  
  //Declaration des différentes images
  var Libre = L.icon({
          iconUrl: 'assets/images/borne_libre.png',
            iconAnchor: [10, 48],
            popupAnchor:  [0, -50] 
          });

  var LibrePass = L.icon({
          iconUrl: 'assets/images/borne_libre_statiopass.png',
            iconAnchor: [10, 48],
            popupAnchor:  [0, -50] 
          });

  var OccupePass = L.icon({
          iconUrl: 'assets/images/borne_occupe_statiopass.png',
            iconAnchor: [10, 48],
            popupAnchor:  [0, -50]  
          });

  var DecoPass = L.icon({
          iconUrl: 'assets/images/borne_veille_statiopass.png',
            iconAnchor: [10, 48],
          popupAnchor:  [0, -50] 
          });

  for (var k in spots){
    if ((spots[k].type_spot == "Statio'Pass")&& (spots[k].dist <= 10000)){      
      
      var popi = L.popup();

      if(statuts[k].connected ==0){
        var Icone=DecoPass;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Indisponible', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);
      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupePass;
        var etat="Occupé";
        var statecluster="occupe";

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          BusyBtn = createButton('Place occupée', container);

        BusyBtn.style.backgroundColor = "grey";

        popi.setContent(container);
        
      }
      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibrePass;
        var etat="Libre";
        var statecluster="libre";
        var k_local = k;

        var container = L.DomUtil.create('div'),
          PopupTxt = createText(spots[k],etat,container),
          ItBtn = createButton('Itinéraire', container),
          BookBtn = createButton('Réserver', container);

        L.DomEvent.on(BookBtn, 'click', function(){
          if (!my_booking.is_booked){
            my_booking.is_booked = true;
            my_booking.id = spots[k_local].id;
            my_booking.address = spots[k_local].address;
            my_booking.lat = spots[k_local].lat;
            my_booking.lng= spots[k_local].lng;
            BookBtn.innerHTML = "Annuler";
            BookBtn.style.backgroundColor = "#d34836";
            BookBtn.style.color = "white";            
            $(".leaflet-popup-close-button")[0].click();          

          }
          else {
            cancel_booking();
            $(".leaflet-popup-close-button")[0].click();      
            BookBtn.innerHTML = "Réserver";
            BookBtn.style.backgroundColor = "#488aff";
            BookBtn.style.color = "white";
          }
        });

        L.DomEvent.on(ItBtn, 'click', function(){
          window.location.href = 'http://maps.apple.com/?ll='+spots[k].lat+','+spots[k].lng;
        });

        popi.setContent(container);
      }

      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup(popi)
        .openPopup();
      cluster.addLayer(marker)
    }
  }

  
}










export function deg2rad(x){
  return Math.PI*x/180;
}

export function createButton(label, container) {
    console.log("button created");
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    // Ajout du style du boutton : 
    btn.style.backgroundColor = "#488aff";
    btn.style.color = 'white';
    btn.style.fontSize = 'medium';
    btn.onmouseover = function(){
      btn.style.color = 'black';
    }
    btn.onmouseleave = function(){
      btn.style.color = 'white';
    }
    return btn;
}

export function createText(spot,etat,container){
    console.log("text created");
    var txt = L.DomUtil.create('div', '', container);
    txt.innerHTML = "Place n° "+spot.id+"<br>Ville : "+spot.city+"<br>Adresse : "+spot.address+"<br>Type de place : "+spot.type_spot+"<br> Etat : "+etat+"<br>"+"Plage de fonctionnement : Chargement...";
    return txt;
}
 
export function get_distance_m(lat1, lng1, lat2, lng2) {
  var earth_radius = 6378.137; 
  var lo1 = deg2rad(lng1);    
  var la1 = deg2rad(lat1);
  var lo2 = deg2rad(lng2);
  var la2 = deg2rad(lat2);
  var d = Math.acos(Math.sin(la1)*Math.sin(la2) + Math.cos(la1)*Math.cos(la2)*Math.cos(lo1-lo2));
  return (earth_radius*d);
}