

//recupere toute les places en fonction de la latitude et longitude passez en parametre
function getspot(lat,lng){
  var Icone=Libre;
  var etat= "Libre";
  map.setZoom(15);
  var data=$.ajax({ 
    url: "/getspot?lat="+lat+"&lng="+lng,
          }).done(function (data) {
            append_spot_and_update(data);
          }).fail(function(){
            $('.flow-text').empty();
            $('.flow-text').append("Un probleme est survenue, veuillez réessayer.")
          });
}


//fonction d'implementation des spots
function getspotstatus(data,callback){
  //Declaration des différentes images
  var Infraction = L.icon({
            iconUrl: '../assets/borne_infraction.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
  var Libre = L.icon({
            iconUrl: '../assets/borne_libre.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
  var LibreElec = L.icon({
            iconUrl: '../assets/borne_libre_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
  var LibreMinute = L.icon({
            iconUrl: '../assets/borne_libre_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
   var LibrePass = L.icon({
            iconUrl: '../assets/borne_libre_statiopass.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
   var OccupeMinute = L.icon({
            iconUrl: '../assets/borne_occupe_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
    var OccupePass = L.icon({
            iconUrl: '../assets/borne_occupe_statiopass.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var OccupeElec = L.icon({
            iconUrl: '../assets/borne_occupe_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var DecoMinute = L.icon({
            iconUrl: '../assets/borne_veille_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var DecoPass = L.icon({
            iconUrl: '../assets/borne_veille_statiopass.png',
             iconAnchor: [10, 48],
            popupAnchor:  [0, -50] 
           });
    var DecoElec = L.icon({
            iconUrl: '../assets/borne_veille_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });

   $.getJSON("/allstatus").done(function(spot) {
     $.each(data, function(key, value) {  
          if (spot[value.id].connected && value.spot_type!=="Statio'Gateway") {
              if(spot[value.id].connected.value=="0" && value.spot_type=="Statio'Minute"){
                var Icone=DecoMinute;
                var etat="Informations indisponibles";
                var statecluster="indisponibles";
                var layer=minute;
                var button = "";
              }
               else if(spot[value.id].connected.value=="0" && value.spot_type=="Statio'Pass"){
                var Icone=DecoPass;
                var etat="Informations indisponibles";
                var statecluster="indisponibles";
                var layer=pass;
                var button = "";
              }
               else if(spot[value.id].connected.value=="0" && value.spot_type=="Statio'Elec"){
                var Icone=DecoElec;
                var etat="Informations indisponibles";
                var statecluster="indisponibles";
                var layer=elec;
                var button = "";
              }
              //STATIO'Ainé
              /*else if(spot[value.id].connected.value=="0" && value.spot_type=="Statio'Ainé"){
                Icone=Decoaine;
                etat="Informations indisponibles";
                statecluster="indisponibles"
                layer=elec;
              }
              //STATIO'Liv
              else if(spot[value.id].connected.value=="0" && value.spot_type=="Statio'Liv"){
                Icone=DecoLiv;
                etat="Informations indisponibles";
                statecluster="indisponibles"
                layer=elec;
              }*/
              else if (spot[value.id].vehicle_detected.value=="1" && value.spot_type=="Statio'Minute") {
                var Icone=OccupeMinute;
                var layer=minute;
                var etat="Occupé";
                var statecluster="occupe";
                var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';

              }
              else if(spot[value.id].vehicle_detected.value=="0" && value.spot_type=="Statio'Minute"){
                var Icone=LibreMinute;
                var etat="Libre";
                var layer=minute;
                var statecluster="libre";
                var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'
              }
              else if (spot[value.id].vehicle_detected.value=="1" && value.spot_type=="Statio'Pass"){
                var Icone=OccupePass;
                var layer=pass;
                var etat="Occupé";
                var statecluster="occupe";
                var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';

              }
              else if(spot[value.id].vehicle_detected.value=="0" && value.spot_type=="Statio'Pass"){
                var Icone=LibrePass;
                var layer=pass;
                var etat="Libre";
                var statecluster="libre";
                var button = '<br><a class="waves-effect waves-light btn green modal-trigger" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'

     
              }
              //STATIO'Ainé
             /* else if (spot[value.id].vehicle_detected.value=="1" && value.spot_type=="Statio'Ainé"){
                var Icone=Occupeaine;
                var layer=pass;
                var etat="Occupé";
                var statecluster="occupe"
              }
              else if(spot[value.id].vehicle_detected.value=="0" && value.spot_type=="Statio'Ainé"){
                var Icone=Libreaine;
                var layer=pass;
                var etat="Libre";
                var statecluster="libre"
     
              }*/
               //STATIO'Liv
             /* else if (spot[value.id].vehicle_detected.value=="1" && value.spot_type=="Statio'Liv"){
               var  Icone=OccupeLiv;
               var  layer=pass;
               var  etat="Occupé";
               var  statecluster="occupe"
              }
              else if(spot[value.id].vehicle_detected.value=="0" && value.spot_type=="Statio'Liv"){
               var  Icone=LibreLiv;
               var  layer=pass;
               var  etat="Libre";
               var  statecluster="libre"
     
              }*/
              else if (spot[value.id].charging) {

                 if(spot[value.id].charging.value=="0" && value.spot_type=="Statio'Elec"){
                  var Icone=LibreElec;
                  var etat="Libre";
                  var statecluster="libre";
                  var layer= elec;
                  var button = '<br><a class="waves-effect waves-light btn green modal-trigger libre" onClick="reserver('+value.id+","+devicenumber+","+value.latitude+","+value.longitude+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger libre" onClick="calcitineraire('+value.id+','+value.latitude+','+value.longitude+')"><span class="white-text">Itinéraire</span></a>'

                }
                else if(spot[value.id].charging.value=="1" && value.spot_type=="Statio'Elec"){
                  var Icone=OccupeElec;
                  var etat="Occupé";
                  var statecluster="occupe";
                  var layer=elec;
                  var button = '<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.id+','+devicenumber+','+value.latitude+','+value.longitude+')"><span class="white-text">Se souvenir de cette position</span></a>';
                }
              }
            var device = value.links;//recuperation de l'url du device
            var devicenumber = device.match(/\d+/);//passage de l'url du device a son id
            marker = L.marker([value.latitude, value.longitude],{name: value.id , city: value.city, device: devicenumber ,comment:value.spot_type,statecluster:statecluster,etat:etat, icon: Icone,address:value.address,lat:value.latitude,lon:value.longitude,content:"<br>Plage de fonctionnement : Chargement..."}).bindPopup("Place n°"+value.id+"<br>Ville : "+value.city+"<br>Adresse : "+value.address+"<br>Type de place : "+value.spot_type+"<br> Etat : "+etat+button+"<br> Plage de fonctionnement : Chargement...").addTo(layer);
            marker.on('click', getspotcalendar);
            clusters.addLayer(aine);
            clusters.addLayer(pass);
            clusters.addLayer(minute);
            clusters.addLayer(elec); //ajout des marker dans le cluster
            map.addLayer(clusters); // ajout cluster sur la map
            tableaumarker.push(marker);
            var Icone=Libre ;// reset a Libre l'image
            var etat= "Libre";
            
          }
          }); 
   callback();
      });

}
//fonction de mise a jour des spots
function updatespotstatus(){
  //Declaration des différentes images
  var Infraction = L.icon({
            iconUrl: '../assets/borne_infraction.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
  var Libre = L.icon({
            iconUrl: '../assets/borne_libre.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
  var LibreElec = L.icon({
            iconUrl: '../assets/borne_libre_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
  var LibreMinute = L.icon({
            iconUrl: '../assets/borne_libre_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
   var LibrePass = L.icon({
            iconUrl: '../assets/borne_libre_statiopass.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
   var OccupeMinute = L.icon({
            iconUrl: '../assets/borne_occupe_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
    var OccupePass = L.icon({
            iconUrl: '../assets/borne_occupe_statiopass.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var OccupeElec = L.icon({
            iconUrl: '../assets/borne_occupe_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var DecoMinute = L.icon({
            iconUrl: '../assets/borne_veille_statiominute.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50]  
           });
    var DecoPass = L.icon({
            iconUrl: '../assets/borne_veille_statiopass.png',
             iconAnchor: [10, 48],
            popupAnchor:  [0, -50] 
           });
    var DecoElec = L.icon({
            iconUrl: '../assets/borne_veille_statioelec.png',
             iconAnchor: [10, 48],
              popupAnchor:  [0, -50] 
           });
    $.getJSON("/allstatus").done(function(spot) {
     $.each(tableaumarker, function(key, value) {   
          if (spot[value.options.name].connected) {
            if (spot[value.options.name].vehicle_detected.value=="1"  && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Minute") {
              etat="Occupé";
              value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.options.name+','+value.options.device+','+value.options.lat+','+value.options.lon+')"><span class="white-text">Se souvenir de cette position</span></a>'+value.options.content;
              value.setIcon(OccupeMinute);
              value.options.etat="Occupé";
              value.options.statecluster="occupe";
            }
          else if(spot[value.options.name].connected.value=="0" && value.options.comment=="Statio'Elec"){
            value.setIcon(DecoElec);
            value.options.statecluster="indisponibles";
            etat="Informations indisponibles";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat;
          }
          else if(spot[value.options.name].connected.value=="0" && value.options.comment=="Statio'Minute"){
            value.setIcon(DecoMinute);
            value.options.statecluster="indisponibles";
            etat="Informations indisponibles";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat;
          } 
           else if(spot[value.options.name].connected.value=="0" && value.options.comment=="Statio'Pass"){
            value.setIcon(DecoPass);
            value.options.statecluster="indisponibles";
            etat="Informations indisponibles";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat;
          }
          //Statio'ainé
          /*
          else if(spot[value.options.name].connected.value=="0" && value.spot_type=="Statio'Ainé"){
            //Icone=DecoPass
            value.setIcon(DecoAine);
            value.options.statecluster="indisponibles";
            etat="Informations indisponibles"
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.device+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;

          }
          //Station'Liv
          else if(spot[value.options.name].connected.value=="0" && value.spot_type=="Statio'Liv"){
            //Icone=DecoPass
            value.setIcon(DecoLiv);
            value.options.statecluster="indisponibles";
            etat="Informations indisponibles"
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;

          }*/
          else if(spot[value.options.name].vehicle_detected.value=="0"  && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Minute"){
            var etat="Libre";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn green modal-trigger libre" onClick="reserver('+value.options.name+","+value.options.device+","+value._latlng.lat+","+value._latlng.lng+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger libre" onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')"><span class="white-text">Itinéraire</span></a>'+value.options.content;
            value.setIcon(LibreMinute);
            value.options.etat="Libre";
            value.options.statecluster="libre";
          }
          else if (spot[value.options.name].vehicle_detected.value=="1"  && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Pass"){
            var etat="Occupé";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.options.name+','+value.options.device+','+value.options.lat+','+value.options.lon+')"><span class="white-text"> Se souvenir de cette position</span></a>'+value.options.content;            
            value.setIcon(OccupePass);
            value.options.etat="Occupé";
            value.options.statecluster="occupe";
          }
          else if(spot[value.options.name].vehicle_detected.value=="0" && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Pass"){
            var etat="Libre";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de Place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn green modal-trigger libre" onClick="reserver('+value.options.name+","+value.options.device+","+value._latlng.lat+","+value._latlng.lng+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger libre" onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')"><span class="white-text">Itinéraire</span></a>'+value.options.content;
            value.setIcon(LibrePass);
            value.options.etat="Libre";
            value.options.statecluster="libre";
          }
          else if (spot[value.options.name].charging) {
            if(spot[value.options.name].charging.value=="0"  && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Elec"){
              var etat="Libre";
              value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn green modal-trigger libre" onClick="reserver('+value.options.name+","+value.options.device+","+value._latlng.lat+","+value._latlng.lng+')"><span class="white-text">Réserver</span></a><a class="waves-effect waves-light btn green modal-trigger libre" onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')"><span class="white-text">Itinéraire</span></a>'+value.options.content;
              value.setIcon(LibreElec);
              value.options.statecluster="libre";
          }
          else if(spot[value.options.name].charging.value=="1"  && spot[value.options.name].connected.value=="1" && value.options.comment=="Statio'Elec"){
              var etat="Occupé";
              value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><a class="waves-effect waves-light btn blue modal-trigger park" onClick="park('+value.options.name+','+value.options.device+','+value.options.lat+','+value.options.lon+')"><span class="white-text"> Se souvenir de cette position</span></a>'+value.options.content;
              value.setIcon(OccupeElec);
              value.options.statecluster="occupe";
           }
          }
          //Statio'aine
          /*else if (spot[value.options.name].vehicle_detected.value=="1" && value.options.comment=="Statio'Ainé"){
            etat="Occupé";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;
            value.setIcon(Occupeaine);
            value.options.etat="Occupé";
            value.options.statecluster="occupe";
          }
          else if(spot[value.options.name].vehicle_detected.value=="0" && value.options.comment=="Statio'Ainé"){
          etat="Libre";
          value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;
          value.setIcon(Libreaine);
          value.options.etat="Libre";
          value.options.statecluster="libre";
          }*/
          //Statio'Liv
          /*
          else if (spot[value.options.name].vehicle_detected.value=="1" && value.options.comment=="Statio'Liv"){
            etat="Occupé";
            value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;
            value.setIcon(OccupeLiv);
            value.options.etat="Occupé";
            value.options.statecluster="occupe";
          }
          else if(spot[value.options.name].vehicle_detected.value=="0" && value.options.comment=="Statio'Liv"){
          etat="Libre";
          value._popup._content="Place n°"+value.options.name+"<br>Ville : "+value.options.city+"<br>Adresse : "+value.options.address+"<br>Type de place : "+value.options.comment+"<br> Etat : "+etat+'<br><button onClick="calcitineraire('+value.options.name+','+value.options.lat+','+value.options.lon+')">Calculer itineraire</button><button onClick="park('+value.options.device+','+value.options.lat+','+value.options.lon+')">Je suis garer ici!</button>'+"<br>Plage de fonctionnement:"+value.options.content;
          value.setIcon(LibreLiv);
          value.options.etat="Libre";
          value.options.statecluster="libre";
          }*/
          
             
          
          value._popup.update();
          
          }
          else{
           //Pas de valeur (pas connectee)
          }
         
          }); 
          
      });

}
function value(id){
  this.target = id;

}

  function markerFunction(id){
        for (var i in tableaumarker){
            var markerID = tableaumarker[i].options.name;
            console.log(markerID)
            if (markerID == id){
              value = new value(tableaumarker[i])
              getspotcalendar(value);
            tableaumarker[i].openPopup();
            };
        }
    }
function getspotbyid(id){
     $.getJSON("/getspotbyid?spot="+id).done(function(status) {
      var deviceid = status.links.device.href.match(/\d+/);
      park(status.id,deviceid,status.location.gps.latitude,status.location.gps.longitude);
      getspot(status.location.gps.latitude, status.location.gps.longitude);
      map.panTo(new L.LatLng(status.location.gps.latitude, status.location.gps.longitude));
      clusterize();
      map.setZoom(18);

     });


}

