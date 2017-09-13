import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';
import 'leaflet-routing-machine';

export function getAllSpots(data,pos){
  var spots = new Array();
  for(let index in data){  
    if (data[index]["location"]["gps"]["latitude"] != null ) {
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
  for (let index in data){
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
  //Declaration des différentes images
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

  for (let k in spots){
    if ((spots[k].type_spot == "Statio'Minute") && (spots[k].dist <= 20) ){
      if(statuts[k].connected ==0){
        var Icone=DecoMinute;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        // var button = "";
      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupeMinute;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }
      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibreMinute;
        var etat="Libre";
        var statecluster="libre";
        // var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'
      }

      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup("Place n° "+spots[k].id+"<br>Ville : "+spots[k].city+"<br>Adresse : "+spots[k].address+"<br>Type de place : "+spots[k].type_spot+"<br> Etat : "+etat/*+button*/+"<br> Plage de fonctionnement : Chargement...")
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

  for (let k in spots){
    if ((spots[k].type_spot == "Statio'Elec") && (spots[k].dist <= 20)){
      if(statuts[k].connected ==0){
        var Icone=DecoElec;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        // var button = "";
      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupeElec;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }

      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibreElec;
        var etat="Libre";
        var statecluster="libre";
        // var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'
      }

      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup("Place n° "+spots[k].id+"<br>Ville : "+spots[k].city+"<br>Adresse : "+spots[k].address+"<br>Type de place : "+spots[k].type_spot+"<br> Etat : "+etat/*+button*/+"<br> Plage de fonctionnement : Chargement...")
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

  for (let k in spots){
    if ((spots[k].type_spot == "Statio'Pass")&& (spots[k].dist <= 20)){      
      if(statuts[k].connected ==0){
        var Icone=DecoPass;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        var button = "";
      }
      else if (statuts[k].vehicle_detected == 1) {
        var Icone=OccupePass;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<a class="marker-button" ><span class="white-text" > Réserver </span></a> <a class="marker-button" ><span class="white-text"> Itinéraire </span></a>';
        ; 
        
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }
      else if(statuts[k].vehicle_detected == 0){
        var Icone=LibrePass;
        var etat="Libre";
        var statecluster="libre";
        var button = "";
        
        // var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'
      }
      var marker = L.marker([spots[k].lat, spots[k].lng],{icon : Icone, statecluster : statecluster})
        .bindPopup("Place n° "+spots[k].id+"<br>Ville : "+spots[k].city+"<br>Adresse : "+spots[k].address+"<br>Type de place : "+spots[k].type_spot+"<br> Etat : "+etat+"<br>"+/*button+*/"<br> Plage de fonctionnement : Chargement...")
        .openPopup();
      cluster.addLayer(marker)
    }
  }
}


export function deg2rad(x){
  return Math.PI*x/180;
}
 
export function get_distance_m(lat1, lng1, lat2, lng2) {
  var earth_radius = 6378.137; 
  var lo1 = deg2rad(lng1);    
  var la1 = deg2rad(lat1);
  var lo2 = deg2rad(lng2);
  var la2 = deg2rad(lat2);
  var d = Math.acos(Math.sin(la1)*Math.sin(la2) + Math.cos(la1)*Math.cos(la2)*Math.cos(lo1-lo2));
  // var dlo = (lo2 - lo1) / 2;
  // var dla = (la2 - la1) / 2;
  // var a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(la1) * Math.cos(la2) * (Math.sin(dlo) * Math.sin(dlo));
  // var d2 = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (earth_radius*d);
}