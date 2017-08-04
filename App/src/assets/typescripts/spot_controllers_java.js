import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';

export function getAllSpots(data){
  var spots = new Array();
  for(let index in data){    
      spots.push({
        "lat" : data[index]["location"]["gps"]["latitude"],
        "lng" : data[index]["location"]["gps"]["longitude"],
        "id" : data[index]["id"],
        "type_spot" : data[index]["spot_type"],
        "address" : data[index]["location"]["address"],
        "city" : data[index]["location"]["town"],
        "links" : data[index]["links"]["device"]["href"],
        "libre" : data[index]["libre"]
      });     
  }
  return(spots)
};

//fonction d'implementation des spots
export function get_minute(data, cluster){
  console.log("Minute called")
  //Declaration des différentes images
  var spots = getAllSpots(data);
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
    if (spots[k].type_spot == "Statio'Minute"){
      if(/* Test disponibilité : spot[value.id].connected.value=="0"*/ spots[k].libre == 2 ){
        var Icone=DecoMinute;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        var button = "";
      }

      else if (/*spot[value.id].vehicle_detected.value=="1"*/ spots[k].libre == 0) {
        var Icone=OccupeMinute;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }

      else if(/*spot[value.id].vehicle_detected.value=="0" */ spots[k].libre == 1){
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

export function get_elec(data, cluster){
    console.log("Elec called")
  var spots = getAllSpots(data);
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
    if (spots[k].type_spot == "Statio'Elec"){
      if(/* Test disponibilité : spot[value.id].connected.value=="0"*/ spots[k].libre == 2 ){
        var Icone=DecoElec;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        var button = "";
      }

      else if (/*spot[value.id].vehicle_detected.value=="1"*/ spots[k].libre == 0) {
        var Icone=OccupeElec;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }

      else if(/*spot[value.id].vehicle_detected.value=="0" */ spots[k].libre == 1){
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

export function get_pass(data, cluster){
  console.log("Pass called")
  var spots = getAllSpots(data);
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
    if (spots[k].type_spot == "Statio'Pass"){
      if(/* Test disponibilité : spot[value.id].connected.value=="0"*/ spots[k].libre == 2 ){
        var Icone=DecoPass;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        var button = "";
      }

      else if (/*spot[value.id].vehicle_detected.value=="1"*/ spots[k].libre == 0) {
        var Icone=OccupePass;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }

      else if(/*spot[value.id].vehicle_detected.value=="0" */ spots[k].libre == 1){
        var Icone=LibrePass;
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