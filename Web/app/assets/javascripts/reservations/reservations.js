
function reserver(spotid,deviceid,lat,lon) {
 createbooking(spotid,deviceid,lat,lon);
 
}
function formatDate(value)
{
	month=value.getMonth()+1;
	if (value.getMinutes() < 10) {
       minutes= '0' + value.getMinutes();
   }
   else{
   	minutes=value.getMinutes();
   }
   return value.getDate() + "/" + month + "/" + value.getFullYear() +" "+ value.getHours()+":"+minutes;
}


function getbookings(){
	$.getJSON("/getbookings").done(function(bookings) {
		$("#oldreservations li ").remove();
		$.each(bookings,function(key,value){
		var spotid =value.spot_id;
		var id = value.id;
		var deviceid = value.deviceid;
		var lat = value.lat;
		var lon= value.lon;
		var etat = value.etat;
		var time = value.time;
		var time= new Date(time);
		var modif_date = value.modif_date;
		var modif_date_readable =  formatDate(new Date(modif_date))
		var readabletime = formatDate(time);
		var now = new Date();
		var timeDiff = Math.abs(time.getTime() - now.getTime())/1000;
		if (etat == "En cours"){
				$("#allreservations li ").remove();
		    	$("#allreservations ").append("<li class='collection-item grey lighten-5'>Reservation du "+readabletime+" <br>"+etat+"<div class='secondary-content'><img src='../assets/bt_valider.png' alt='Valider' title='Valider' onclick='validatebooking("+id+","+spotid+","+deviceid+","+lat+","+lon+")'><img src='../assets/bt_supprimer.png'  alt='Supprimer' title='Supprimer' onclick='deletebooking("+id+")'><img  id='info' src='../assets/bt_information.png'  alt='Informations' title='Informations' onclick='infobookings("+spotid+")'></div>");
			}
		if (timeDiff <= 86400) {
			if (etat == "En cours"){
				$("#allreservations li ").remove();
		    	$("#allreservations ").append("<li class='collection-item grey lighten-5'>Reservation du "+readabletime+" <br>"+etat+"<div class='secondary-content'><img src='../assets/bt_valider.png' alt='Valider' title='Valider' onclick='validatebooking("+id+","+spotid+","+deviceid+","+lat+","+lon+")'><img src='../assets/bt_supprimer.png' alt='Supprimer' title='Supprimer' onclick='deletebooking("+id+")'><img  id='info' src='../assets/bt_information.png'  alt='Informations' title='Informations' onclick='infobookings("+spotid+")'></div>");
			}
			else{
				$("#allreservations").append("<li class='collection-item grey lighten-5'> Reservation du "+readabletime+" <br>"+etat +" le "+modif_date_readable+"<img class='secondary-content' id='info' src='../assets/bt_information.png' alt='Informations' title='Informations' onclick='infobookings("+spotid+")'>");
			}
		}


		})

	});

}


function infobookings(spotid){

	$.getJSON("/getspotbyid?spot="+spotid+"").done(function(spot) {
		var $title = $("#reservation .modal-content h4");
	  	var $content = $("#reservation .modal-content p");
	  	var $footer = $("#reservation .modal-footer");
	  	$title.empty();
	  	$title.append("Details réservation :");
	  	$content.empty();
	  	$footer.empty();
	  	$content.append("<h6>Borne: "+spot.id+"</h6><h6>Type: "+spot.spot_type+"</h6><h6>Ville: "+spot.location.town+"</h6><h6>Adresse: "+spot.location.address+"</h6>");
  		$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
  		$("#reservation").openModal();
	});
	
}


//Création d'une reservation 
function createbooking(spotid,deviceid,lat,lon){
	$.ajax({
	  url: '/createbooking',
	  type: 'POST',
	  data: {id_spot:spotid,deviceid:deviceid,lat:lat,lon:lon},
	  success: function(data) {  
	  	var $title = $("#reservation .modal-content h4");
	  	var $content = $("#reservation .modal-content p");
	  	var $footer = $("#reservation .modal-footer");
	  	$title.empty();
	  	$title.append("Reservation borne "+spotid+" :");
	  	$content.empty();
	  	$footer.empty();
	  	$content.append("Cette place est maintenant réservé");
	  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
	  	id=data;
  		$("#reservation").openModal();
	  	getbookings();
	  }
	  ,
	  error: function(jqXHR){
	  	var $title = $("#reservation .modal-content h4");
	  	var $content = $("#reservation .modal-content p");
	  	var $footer = $("#reservation .modal-footer");
	  	if (jqXHR.status == "400"){
		  	$title.empty();
		  	$content.empty();
		  	$footer.empty();
		  	$title.append("Vous avez deja une reservation en cours !");
		  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
	  		$("#reservation").openModal();
  		}
  		else if (jqXHR.status == "403"){
	  		$title.empty();
		  	$content.empty();
		  	$footer.empty();
		  	$title.append("Pour reserver identifiez vous !");
		  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
	  		$("#reservation").openModal();
  		}
	  }
	});

}

//Validation et passage de la reservation a l'etat valide
function validatebooking(id,spotid,deviceid,lat,lon){
	var temps_restant= getCookie('temps_restant');
	temps_restant= new Date(temps_restant);
	$.getJSON("/getlaststatus?spot="+spotid+"").done(function(spot) {
	if (spot.vehicle_detected.value==0) {
		var $title = $("#reservation .modal-content h4");
	  	var $content = $("#reservation .modal-content p");
	  	var $footer = $("#reservation .modal-footer");
		$title.empty();
		$content.empty();
		$footer.empty();
		$title.append("Vous devez vous garez avant de valider !");
		$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
	  	$("#reservation").openModal();
	}
	else{

	    if (navigator.geolocation) {
		   navigator.geolocation.getCurrentPosition(function(position) {
		   position.coords.latitude 
		   position.coords.longitude
		var $title = $("#reservation .modal-content h4");
		var $content = $("#reservation .modal-content p");
		var $footer = $("#reservation .modal-footer");
		$.ajax({
		  url: '/validatebooking',
		  type: 'POST',
		  data: {id:id,lat:lat,lon:lon,currentlat:position.coords.latitude,currentlon:position.coords.longitude,spot:spotid},
		  success: function(data) {
		  	park(spotid,deviceid,lat,lon);
		    $title.empty();
		  	$content.empty();
		  	$title.append("Merci d'avoir validé votre reservation !");
	  		$("#reservation").openModal();
	  		getbookings();
	  		$("#allreservations li ").remove();
	  		$("#allreservations").append("<li class='collection-item grey lighten-5'>Aucune reservations en cours</li>");

		  },
		  error: function(jqXHR){
		  	var $title = $("#reservation .modal-content h4");
		  	var $content = $("#reservation .modal-content p");
		  	if (jqXHR.status == "400"){
			  	$title.empty();
			  	$content.empty();
			  	$footer.empty();
			  	$title.append("Vous n'etes pas dans le perimetre de validation de la borne !");
			  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
		  		$("#reservation").openModal();
	  		}
	  		else if (jqXHR.status == "403"){
			  	$title.empty();
			  	$content.empty();
			  	$footer.empty();
			  	$title.append("Cette reservation à déjà été validée!");
			  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
		  		$("#reservation").openModal();
	  		}
		  }
		});
		},
		function(error){
		if(error.PERMISSION_DENIED){
			var $title = $("#reservation .modal-content h4");
		  	var $content = $("#reservation .modal-content p");
		  	var $footer = $("#reservation .modal-footer");
			$title.empty();
			$content.empty();
			$footer.empty();
			$title.append("Etes vous sure de vouloir valider?");
			$content.append("<p>La géolocalisation a été refusé</p>");
			$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Non</a><a href='#!' onclick='bypassvalidate("+id+","+lat+","+lon+","+spotid+","+deviceid+")' class='modal-action modal-close waves-effect waves-green btn-flat'>Oui</a>")
		  	$("#reservation").openModal();
		  	
		}
		});
		
	}
	}
	});

	
}

function bypassvalidate(id,lat,lon,spotid,deviceid){
	$.getJSON("/getlaststatus?spot="+spotid+"").done(function(spot) {
		if (spot.vehicle_detected.value==0) {
			var $title = $("#reservation .modal-content h4");
		  	var $content = $("#reservation .modal-content p");
			$title.empty();
			$content.empty();
			$title.append("Vous devez vous garez avant de valider !");
		  	$("#reservation").openModal();
		}
		else{
		$.ajax({
				  url: '/validatebookingbypass',
				  type: 'POST',
				  data: {id:id,lat:lat,lon:lon,spot:spotid},
				  success: function(data) {
				  	var $title = $("#reservation .modal-content h4");
				  	var $content = $("#reservation .modal-content p");
				  	var $footer = $("#reservation .modal-footer");
				  	park(spotid,deviceid,lat,lon);
				    $title.empty();
				  	$content.empty();
				  	$footer.empty();
				  	$title.append("Merci d'avoir validé votre reservation !");
				  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>");
			  		$("#reservation").openModal();
			  		getbookings();
			  		$("#allreservations li ").remove();
			  		$("#allreservations").append("<li class='collection-item grey lighten-5'>Aucune reservations en cours</li>");
			  		
				  },
				  error: function(jqXHR){
				  	var $title = $("#reservation .modal-content h4");
				  	var $content = $("#reservation .modal-content p");
				  	if (jqXHR.status == "400"){
					  	$title.empty();
					  	$content.empty();
					  	$title.append("Vous n'etes pas dans le perimetre de validation de la borne !");
				  		$("#reservation").openModal();
			  		}
			  		else if (jqXHR.status == "403"){
					  	$title.empty();
					  	$content.empty();
					  	$title.append("Cette reservation à déjà été validée!");
				  		$("#reservation").openModal();
			  		}
				  }
			});
		}
	});
}

//Suppression de la reservation
function deletebooking(id){
	var $title = $("#reservation .modal-content h4");
	var $content = $("#reservation .modal-content p");
	var $footer = $("#reservation .modal-footer");
	$.ajax({
	  url: '/deletebooking',
	  type: 'POST',
	  data:{id:id},
	  success: function(data) {
	  	$title.empty();
	  	$content.empty();
	  	$footer.empty();
	  	$title.append("Reservation supprimé avec succès!");
	  	$footer.append("<a href='#!' class='modal-action modal-close waves-effect waves-green btn-flat'>Fermer</a>")
  		$("#reservation").openModal();
	 	getbookings();
	 	$("#allreservations li ").remove();
  		$("#allreservations").append("<li class='collection-item grey lighten-5'>Aucune reservations en cours</li>");

	  }
	});

}
