import 'leaflet';
import 'leaflet-easybutton';
import 'leaflet.markercluster';



export function getAllSpots(data){
  var spots = Array<{id,lat,lng,type_spot,address,city,links}>();
  for(let index in data){    
      spots.push({
        lat : data[index]["location"]["gps"]["latitude"],
        lng : data[index]["location"]["gps"]["longitude"],
        id : data[index]["id"],
        type_spot : data[index]["spot_type"],
        address : data[index]["location"]["address"],
        city : data[index]["location"]["town"],
        links : data[index]["links"]["device"]["href"],
      });      
  }
  return spots
};

export function createSpotsMarkers(data,cluster:L.MarkerClusterGroup){
  var spots = getAllSpots(data);

  var LibreMinute = L.icon({
    iconUrl: 'assets/images/borne-libre-statiominute.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });

  var OccupeMinute = L.icon({
    iconUrl: 'assets/images/borne_occupe_statiominute.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });

  var DecoMinute = L.icon({
    iconUrl: 'assets/images/borne_veille_statiominute.png',
    iconAnchor: [10, 48],
    popupAnchor:  [0, -50] 
  });

  for (let k in spots){
    if (spots[k].type_spot == "Statio'Minute"){
      if(/* Test disponibilité : spot[value.id].connected.value=="0"*/ 0 ){
        var Icone=DecoMinute;
        var etat="Informations indisponibles";
        var statecluster="indisponibles";
        var button = "";
      }

      else if (/*spot[value.id].vehicle_detected.value=="1"*/ 0) {
        var Icone=OccupeMinute;
        var etat="Occupé";
        var statecluster="occupe";
        // var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';s
      }

      else if(/*spot[value.id].vehicle_detected.value=="0" */ 1){
        console.log("Spot libre");
        var Icone=LibreMinute;
        var etat="Libre";
        var statecluster="libre";
        // var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'
      }

      // VOir comment rajouter des options sur un marker pour le gérer dans les clusters
      // marker.option.statcluster
      var marker = L.marker([spots[k].lat, spots[k].lng],{icon: LibreMinute})
        .bindPopup("Place n° "+spots[k].id+"<br>Ville : "+spots[k].city+"<br>Adresse : "+spots[k].address+"<br>Type de place : "+spots[k].type_spot+"<br> Etat : "+etat/*+button*/+"<br> Plage de fonctionnement : Chargement...")
        .openPopup();
        cluster.addLayer(marker)
    }
  }
}