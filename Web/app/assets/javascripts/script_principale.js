//Script d'initialisation de la carte leaflet et des differentes fonction js
//Variables
    var minute,aine,pass,elec,refresh,route,Libre,tableaumarker=[];
    

    $(document).ready(function(){
      $('.modal-trigger').leanModal();
       refreshtime = setInterval(function(){  
        howmuchtime();
       }, 1000);
        checkpresencepark = setInterval(function(){  
        checkpresence();
       }, 20000);
       getbookings();
      var $progress =  $('#load');
      borneid = $_GET('id');
      $progress.hide();
      $('#time').hide();
      initmap(0,0,0,0);
      geocoder = L.control.geocoder('search-ycLaGe6').addTo(map);
      geocoder.expand();
      geocoder.on('select', function (e) {
      $('#loader').show();
      $progress.show();
      $('#load .determinate').css("width", "20%"); 
      clusters.removeLayer(minute);
      minute = new L.LayerGroup();
      clusters.removeLayer(aine);
      aine = new L.LayerGroup();
      clusters.removeLayer(pass);
      pass= new L.LayerGroup();
      clusters.removeLayer(elec);
      elec = new L.LayerGroup();
      $('.leaflet-pelias-input').hide();
      initmap(1,e.latlng.lat,e.latlng.lng);
      });

    
      var Legend =  new L.Control.Legend({
        position: 'bottomleft',
        collapsed: true,
        controlButton: {
            title: "Legend"
       } });
      map.addControl( Legend );
      $(".legend-container").append( $("#legend") );
      $(".legend-toggle").append( "<i class='legend-toggle-icon fa fa-info fa-2x' style='color: #000'></i>" );    
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:20,maxNativeZoom:19}).addTo(map);
      new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
      var popup = L.popup();
    });

//Fonction d'initialisation
function initmap(geocode,lat,lng){
    var popup = L.popup();
    
    if (geocode=="1" ){
        geocoder.collapse();
        $('#loading').show();
        var $text = $('.flow-text p');
         $('#message').hide();
        $text.empty();
        $text.append("Recherche des places disponibles...");
        getspot(lat, lng);
        clusterize();
         
      }
      else if (borneid){
        var $progress =  $('#load');
        $('#loading').show();
        $progress.show();
        var $text = $('.flow-text p');
        $('#message').hide();
        $text.empty();
        $text.append("Recherche de la place en cours...");
        $('#load .determinate').css("width", "20%"); 
      getspotbyid(borneid);

    }
    else
      {
        map.on('locationfound', onLocationFound);
        clusterize();
        map.locate({setView: true, maxZoom: 18});
      }
}


//fonction de geolocalisation de leaflet
function onLocationFound(e) {
        var $progress =  $('#load');
        L.marker(e.latlng).addTo(map).bindPopup("Vous etes ici!").openPopup();
        $progress.show();
        $('#load .determinate').css("width", "20%"); 
        var $text = $('.flow-text p');
        $text.empty();
        $text.append("Recherche des places disponibles...");
         $('#message').hide();
        createCookie("lat",e.latlng.lat,"60");
        createCookie("lng",e.latlng.lng,"60");
        getspot(e.latlng.lat,e.latlng.lng);
}


function append_spot_and_update(data){
    var $progressbar =  $('#load .determinate');
    var $inputsearch =  $('.leaflet-pelias-input');
    $progressbar.css("width", "80%"); 
    clearInterval(refresh); // kill setinterval de mise a jour des markers quand une recherche est relancer
    if (data.length === 0) {
      $('#message').show();
      $('#loader').hide();
      $inputsearch.show();
      $progressbar.css("width", "100%");    
    }
    else{
      getspotstatus(data,function(){  
        $('#loader').hide();
        if (borneid) {
        geocoder.collapse();
        markerFunction(borneid);
        }
        $inputsearch.show(); 
      });
      map.on("zoomstart", function (e) {
        if (clusters._currentShownBounds!==null) {
        clusters.refreshClusters(); 
        }
      });
       refresh = setInterval(function(){
            clusters.refreshClusters();
            updatespotstatus();
            clusters.refreshClusters();
        }, 5000);
    }
}


