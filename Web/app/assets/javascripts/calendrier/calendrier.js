//Obtention du calendrier de la borne
	function getspotcalendar(e){
	var now=new Date();
	var tab_jour=new Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
	var jour = now.getDay();
	var heure = now.getHours();
	var min = now.getMinutes();
	//var tempsautorise = null ;
	tempsautorise = getparkingtime(e.target.options.device,function(tempsautorise){


   $.getJSON("/spotcalendar?spot="+e.target.options.name).done(function(calendar) {
     	$.each(calendar, function(key, value) {   
	     	if (value.day_start <= jour && jour <= value.day_end) {
	     			duration= value.duration;
	     			heuretomin= (value.hour*60)+(value.minute);
	     			adition= heuretomin+value.duration;
	     			findeplage=Math.floor(adition/60);
	     	if (value.hour <= heure && heure <= findeplage) {
	     		if(value.hour == "0" && value.minute == "0" && value.duration == "1440"){
	     			if (value.mode == "minute") {
	     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Limité toute la journéé"+"<br>Durée: "+tempsautorise;
		     		}
		     		else if(value.mode == "handicapped"){
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Reservé handicapés toute la journéé"+"<br>Durée: "+tempsautorise;
		     		}
		     		else if(value.mode == "free"){
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Stationnement Libre toute la journéé"+"<br>Durée: "+tempsautorise;
		     		}
		     		else if (value.mode == "delivery") {
	     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Livraison toute la journéé"+"<br>Durée: "+tempsautorise;
		     		}
	     		}
	     		else{
	     			duration= value.duration;
	     			heuretomin= (value.hour*60)+(value.minute);
	     			adition= heuretomin+value.duration;
	     			minutestr = (adition%60);
	     			if (value.minute == "0") {
	     				value.minute = "00";
	     			}
	     			if (minutestr=="0") {
	     			minutestr = "00"
	     			}
	     			findeplage2=Math.floor(adition/60)+"h"+minutestr;
		     		if (value.mode == "minute") {
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Limité de "+value.hour+"h"+value.minute+" à "+findeplage2+"<br>Durée: "+tempsautorise;
		     		}
		     		else if(value.mode == "handicapped"){
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Reservé handicapés"+value.hour+"k"+value.minute+" à "+findeplage2+"<br>Durée: "+tempsautorise;
		     		}
		     		else if(value.mode == "free"){
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Stationnement Libre "+value.hour+"h"+value.minute+" à "+findeplage2+"<br>Durée: "+tempsautorise;
		     		}
		     		else if(value.mode == "delivery"){
		     			e.target.options.content ="<br> Plage horaire:<br>"+tab_jour[jour]+": Reservé livraison"+value.hour+"h"+value.minute+" à "+findeplage2+"<br>Durée: "+tempsautorise;
		     		}
		     	}
	     	}
	     	}
	     });
	     }).fail(function(){
	     	e.target.options.content ="Durée : "+tempsautorise;
	});
	});
	
	/*if (tempsautorise == null) {
		tempsautorise="Aucune information de durée autorisée";
	}*/
  
}
//Obtention du tmeps autorisé
function getparkingtime(spotid,callback){
	     $.getJSON("/gettime?spot="+spotid).done(function(value) {
	     	
	     		minutes=(value.value/60);
	     		if (value.name == "SP_TIM" ) {
	     			time=(minutes)+" Minutes";
	     			if (minutes > 59) {
	     				Minutes = minutes%60;
    					Heures = (minutes - Minutes)/60;
    					time = Heures.toString() + " heures " + Math.round(Minutes).toString() + " minutes";
	     			}
	     			callback(time);
	     		}
	     		else if(value.name == "SM_TIM" ) {
					time=(minutes)+" Minutes";
	     			if (minutes > 59) {
	     				Minutes = minutes%60;
    					Heures = (minutes - Minutes)/60;
    					time = Heures.toString() + " heures " + Math.round(Minutes).toString() + " minutes";
	     			}
					callback(time);
				}
	     		else if (value.name == "parking_time"){
					time=(minutes)+" Minutes";
	     			if (minutes > 59) {
	     				Minutes = minutes%60;
    					Heures = (minutes - Minutes)/60;
    					time = Heures.toString() + " heures " + Math.round(Minutes).toString() + " minutes";
	     			}
					callback(time);
	     		}
	     	
	     }).fail(function(){
			time = "Aucune information de durée autorisée";
	     	callback(time);
		});


}


function getparkingtimeInMin(spotid,callback){
	     $.getJSON("/gettime?spot="+spotid).done(function(value) {
	     	if (value.length == "0") {
	     		  createCookie("temps_restant","none",60);
	     	}
	     	else{
	     		minutes=(value.value/60);
	     		if (value.name == "SP_TIM" ) {
	     			callback(minutes);
	     		}
	     		else if(value.name == "SM_TIM" ) {
					callback(minutes);
				}
	     		else if (value.name == "parking_time"){
					callback(minutes);
	     		}
	     		else{
	     			createCookie("temps_restant","none",60)
	     		}
	     }
	     }).fail(function(){
	     	callback(time);
		});


}








