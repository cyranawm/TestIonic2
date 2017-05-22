

function tps_pourcent(t1, t2){
    var t = new Date().getTime();
    if (t1.getTime()=="0" && t2.getTime()=="0") { 
    }
    else{
    t1 = t1.getTime();
    t2 = t2.getTime();
    return Math.round(100-(Math.round(((t2 - t) / (t2 - t1)) * 10000) / 100));

      
    }


}


//Fonction de "garage", permet d'enregistrer la position de la voiture de l'utilisateur
function park(spotid,deviceid,lat,lon){
  delete_cookie("parking");
   $(".foundvehicle h5").empty();
  $(".foundvehicle h5").append("Retrouvez votre vehicule");
  $(".foundvehicle img").css("display","block");
  getparkingtimeInMin(deviceid,function(time){
   $.getJSON("/getlaststatus?spot="+spotid).done(function(status) {
       $.getJSON("/getspotbyid?spot="+spotid).done(function(spot) {
        $("#infoparking").empty();
        $("#infoparking").append("<p>"+spot.spot_type+" n°"+spotid+"<br>Adresse : "+spot.location.address+", "+spot.location.town+"</p>");
    if (status.charging) {
      var statustime = status.charging.date;
      convert=statustime.replace(/-/g, '/');
      var beforeaddtime = new Date(convert);
      var result= new Date(convert);
      result.setMinutes(result.getMinutes()+ time);
      createCookie("start_charging",beforeaddtime,time);
      createCookie("start_time","",-1);
      createCookie("temps_restant","",-1);
      iselec = true;
      createCookie("parking",'{"id":'+deviceid+',"lat":'+lat+',"lon":'+lon+',"spotid":'+spotid+',"iselec":'+iselec+',"ville":"'+spot.location.town+'","address":"'+spot.location.address+'","type":"'+spot.spot_type+'"}',"480"); 

    }
    else{
      var statustime = status.vehicle_detected.date;
      convert=statustime.replace(/-/g, '/');
      var beforeaddtime = new Date(convert);
      var result= new Date(convert);
      result.setMinutes(result.getMinutes()+ time);
      createCookie("start_time",beforeaddtime,time);
      createCookie("temps_restant",result,time);
      createCookie("start_charging","",-1);
      temps_restant=getCookie("temps_restant");
      iselec = false;
      createCookie("parking",'{"id":'+deviceid+',"lat":'+lat+',"lon":'+lon+',"spotid":'+spotid+',"iselec":'+iselec+',"ville":"'+spot.location.town+'","address":"'+spot.location.address+'","type":"'+spot.spot_type+'"}',"480"); 
      $.ajax({
      url: '/sendemail',
      type: 'post',
      data: {temps_restant:temps_restant,start_time:beforeaddtime,spotid:spotid},
    });
     }
      });
      
       });
  });
}

function howmuchtime(){
  var currentspot = getCookie('parking');
  currentspot =JSON.parse(currentspot);
  var start_charging=getCookie('start_charging');
  if (start_charging) {
    if (currentspot){
    $("#infoparking").empty();
    $("#infoparking").append("<p>"+currentspot.type+" n°"+currentspot.spotid+"<br>Adresse : "+currentspot.address+", "+currentspot.ville+"</p>");
    }
    var $tempsrestant=$("#temps");
    var $progressbar=$("#progressbartime"); 
    var now=new Date();
    start_charging= new Date(start_charging);
    var timeDiff = Math.abs(start_charging.getTime() - now.getTime())/1000;
    $progressbar.hide();
    $tempsrestant.empty();
    $tempsrestant.append("En charge depuis: "+minTommss(timeDiff/60));
    $(".foundvehicle").css("display","block");
  }
  else{
    if (currentspot) {
    $("#infoparking").empty();
    $("#infoparking").append("<p>"+currentspot.type+" n°"+currentspot.spotid+"<br>Adresse : "+currentspot.address+", "+currentspot.ville+"</p>");
      
    
    }
    var now=new Date();
    var $progressbar=$("#progressbartime"); 
    $progressbar.show();
    var temps_restant= getCookie('temps_restant');
    var start_time = getCookie('start_time')
    temps_restant= new Date(temps_restant);
    start_time = new Date(start_time);
    var timeDiff = Math.abs(temps_restant.getTime() - now.getTime())/1000;
    pourcent = tps_pourcent(start_time,temps_restant);
      $("#avancement").removeClass("orange green red");
      $("#avancement").addClass("green");
    if (pourcent >= "70") {
      $("#avancement").removeClass("green");
      $("#avancement").addClass("orange");
    }
    if (pourcent >= "90") {
      $("#avancement").removeClass("orange green");
      $("#avancement").addClass("red");
    }
    $("#avancement").css("width",pourcent+"%");
    var $tempsrestant=$("#temps");
    var temps_restant=getCookie('temps_restant');
    if (temps_restant===false) {
        $tempsrestant.empty();
        $("#infoparking").empty();
        $tempsrestant.append("Vous devez selectionner un emplacement afin d'avoir des informations sur le temps restant !");
        $("#progressbartime").css("display","none");   

    }
    else if (temps_restant=="none") {
      $tempsrestant.empty();
      $(".foundvehicle").css("display","block");
      $tempsrestant.append("Temps restant: Aucune informations de durée sur cet emplacement!");
    }
    else{
      temps_restant= new Date(temps_restant);
      var timeDiff = Math.abs(temps_restant.getTime() - now.getTime())/1000;
      $tempsrestant.empty();
      if (temps_restant > now ) {
      $tempsrestant.append("Temps restant: "+minTommss(timeDiff/60));
        $("#time").show();
        $(".foundvehicle").css("display","block");
      }
      else{
        $(".foundvehicle").css("display","block");
        $tempsrestant.append("Temps restant: Le temps est écoulé, vous êtes maintenant en infraction. ");
      }
    }
  }
}


function minTommss(minutes){
 var sign = minutes < 0 ? "-" : "";
 var min = Math.floor(Math.abs(minutes));
 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
 if (min <= 59 ) {
 return sign + (min < 10 ? "0" : " ") + min + " minutes et " + (sec < 10 ? "0" : "") + sec +" secondes";
  
 }else{
    var Minutes = minutes%60;
    var Heures = (minutes - Minutes)/60;
    if (Minutes>=59) {
      Minutes = "59";
    }
    var result = Heures.toString() + " heures " + Math.round(Minutes).toString() + " minutes";
  return result;
 }
}

//Fonction pour retrouver la voiture de l'utilisateur
function whereismycar(){  
   var $tempsrestant=$("#tempsrestant");
   var now=new Date();
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude 
      var lon = position.coords.longitude
  if (lat) {
    if (route) {
   $(".leaflet-routing-container").remove();
   route.getPlan().setWaypoints({latLng: L.latLng([0, 0])}); 
  }
   var mycar =  getCookie('parking');
   if (mycar===false) {
      $tempsrestant.empty();
      $tempsrestant.append("Vous devez selectionnez un emplacement!");
      $("#temps-restant").openModal();
   }else{
    mycar=JSON.parse(mycar);
       route =  L.Routing.control({language:'fr',
        waypoints: [
        L.latLng(lat,lon),
        L.latLng(mycar.lat,mycar.lon)
        ]});
    route.addTo(map);
     $("#clearitineraire").empty();
     $("#clearitineraire").append("<a class='waves-button-input btn modal-trigger blue' onclick='clearitineraire()'>Effacer l'itinéraire</a>");
  }
  }
   },function(error){
    if(error.PERMISSION_DENIED){
      $tempsrestant.empty();
      $tempsrestant.append("Veuillez accepter la geolocalisation!");
      $("#temps-restant").openModal();
    }
   });  
}
}

//fonction pour calculer un itineraire en fonction de la position de l'utilisateur 
function calcitineraire(id,lat,lon){
   var $tempsrestant=$("#tempsrestant");
   navigator.geolocation.getCurrentPosition(function(position) {
   var currentlat = position.coords.latitude
   var currentlng = position.coords.longitude
   if (currentlat) {
         if (route) {
          route.getPlan().setWaypoints({latLng: L.latLng([0, 0])});
          $(".leaflet-routing-container").remove();
       }
       route =  L.Routing.control({language:'fr',
        waypoints: [
        L.latLng(currentlat,currentlng),
        L.latLng(lat,lon)
        ]});
        route.addTo(map);
         $(".foundvehicle h5").empty();
         $(".foundvehicle h5").append("Itinéraire");

         $(".foundvehicle").css("display","block");
         $("#clearitineraire").empty();
         $("#clearitineraire").append("<a class='waves-button-input btn modal-trigger blue' onclick='clearitineraire()'>Effacer l'itinéraire</a>");
         
   }
    },function(error){
    if(error.PERMISSION_DENIED){
      $tempsrestant.empty();
      $tempsrestant.append("Veuillez accepter la geolocalisation!");
      $("#temps-restant").openModal();
    }
   });  
      
}

function clearitineraire(){
  $(".foundvehicle").css("display","none");
  $(".foundvehicle h5").empty();
  $(".foundvehicle h5").append("Retrouvez votre vehicule");
  $("#clearitineraire").empty();
  $(".leaflet-routing-container").remove();
   route.getPlan().setWaypoints({latLng: L.latLng([0, 0])});
}


function checkpresence(){
    var current = getCookie('parking');
    current = JSON.parse(current);
    var start = getCookie('start_time');
    var start = new Date(start)
    if (current.iselec== false) {
   $.getJSON("/getlaststatus?spot="+current.spotid).done(function(status) {
    convert=status.vehicle_detected.date.replace(/-/g, '/');
    date = new Date(convert);
    if (status.vehicle_detected.value == 1) {
       if (start.getTime() !== date.getTime() && status.infringement.value == 0) {
          delete_cookie('parking');
          delete_cookie('start_time');
          delete_cookie('temps_restant');
          delete_cookie('start_charging');
          $(".foundvehicle").css("display","none");
          $("#progressbartime").css("display","none");   
       }
    }
    else if (status.vehicle_detected.value == 0) {
       if (start.getTime() !== date.getTime()) {
      delete_cookie('parking');
      delete_cookie('start_time');
      delete_cookie('temps_restant');
      delete_cookie('start_charging');
      $(".foundvehicle").css("display","none");
      $("#progressbartime").css("display","none");   
    }
        
    }
    });
    }
    else{
       var current = getCookie('parking');
    current = JSON.parse(current);
      var start_charging = getCookie("start_charging");
      var start_charging = new Date(start_charging);
  $.getJSON("/getlaststatus?spot="+current.spotid).done(function(status) {
      convert=status.charging.date.replace(/-/g, '/');
      date = new Date(convert);
      console.log(date)
      console.log(start_charging)
      if (start_charging.getTime() !== date.getTime()) {
        delete_cookie('parking');
        delete_cookie('start_charging');
          $(".foundvehicle").css("display","none");
          $("#progressbartime").css("display","none");
      }
      
    
    });

    }
}