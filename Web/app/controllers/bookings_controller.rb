class BookingsController < ApplicationController
require 'rest-client'


def createbooking
if user_signed_in?
	login = current_user.email
	#RestClient.put 'https://api.technolia.fr/spots/'+params[:id_spot]+'/bookings', :login => login,  :spot_id => params[:idspot] 
	if Reservations.where(:login => login).where(:etat => "En cours").blank?
	idspot = Reservations.new(:login => login, :spot_id => params[:id_spot],:deviceid =>params[:deviceid],:etat => "En cours",:lat => params[:lat],:lon => params[:lon],:time => Time.now)
	idspot.save
	render :text => idspot.id , :layout => false
	else
	render :text => "deja reservé" ,:layout => false, :status => 400
	end
else
	render :text => "non connecte" ,:layout => false, :status => 403

end

end

def time_diff(start_time, end_time)
  seconds_diff = (start_time - end_time).to_i.abs
  hours = seconds_diff / 3600
  seconds_diff -= hours * 3600
  minutes = seconds_diff / 60
  seconds_diff -= minutes * 60
  seconds = seconds_diff
  "#{hours.to_s.rjust(2, '0')}:#{minutes.to_s.rjust(2, '0')}:#{seconds.to_s.rjust(2, '0')}"
end

def send_email
	temps_restant = DateTime.parse(params[:temps_restant]).to_time
	start_time = DateTime.parse(params[:start_time]).to_time
	if current_user.accept_notification=="true"	
	@diff = time_diff(temps_restant,start_time)
	if @diff == "04:00:00"
		@result = temps_restant - 600
	elsif @diff == "02:00:00"
		@result = temps_restant - 600
	elsif @diff == "01:30:00"
		@result = temps_restant - 600
	elsif @diff == "01:00:00"
		@result = temps_restant - 600
	elsif @diff == "00:45:00"
		@result = temps_restant - 420
	elsif @diff == "00:30:00"
		@result = temps_restant - 420
	elsif @diff == "00:20:00"
		@result = temps_restant - 300
	elsif @diff == "00:15:00"
		@result = temps_restant - 180
	elsif @diff == "00:10:00"
		@result = temps_restant - 180
	end
	Mailer.delay(run_at: @result).sample_email(current_user.email,params[:start_time],temps_restant,params[:spotid])
	render :text => "ok" , :layout => false
	else
	render :text => "fail" , :layout => false
	end
end
 

def validatebooking
if user_signed_in?
	login = current_user.email
	id= params[:id]
	 a = Geokit::LatLng.new(params[:lat],params[:lng])
     b = Geokit::LatLng.new(params[:currentlat],params[:currentlng])
     distance=a.distance_to(b)
     distance=(distance*1.609).round(2) #passage de miles en KM
     if distance <= 2
     	#RestClient.put 'https://api.technolia.fr/spots/'+params[:id_spot]+'/bookings/booking_id', :etat => "Valide"
		if Reservations.where(:etat => "En cours").blank?
			render :text => "Impossible de valider" ,:layout => false, :status => 403
		else
			idspot = Reservations.update(id,:etat => "Valide",:modif_date => Time.now)
			idspot.save
			render :text => @etat.to_json , :layout => false
		end
	  	else 
	  	render :text => "Impossible de valider" ,:layout => false, :status => 400
		end
	end
end

def validatebookingbypass
if user_signed_in?
	login = current_user.email
	id= params[:id]
     	#RestClient.put 'https://api.technolia.fr/spots/'+params[:id_spot]+'/bookings/booking_id', :etat => "Valide"
		if Reservations.where(:etat => "En cours").blank?
			render :text => "Impossible de valider" ,:layout => false, :status => 403
		else
			idspot = Reservations.update(id,:etat => "Valide",:modif_date => Time.now)
			idspot.save
			render :text => @etat.to_json , :layout => false
		end
	end
end

def deletebooking
if user_signed_in?
	login = current_user.email
	id = params[:id]
	#RestClient.delete 'https://api.technolia.fr/spots/'+params[:id_spot]+'/bookings/booking_id',
	#Reservations.delete(login)
	idspot = Reservations.update(id,:etat => "Supprimé",:modif_date => Time.now)
	idspot.save
	render :text => "ok" , :layout => false
	else
	render :text => "Impossible de supprimer" ,:layout => false, :status => 403
	end

end

#get bookings api
def getbookings
	if user_signed_in?
		login=current_user.email
		@reservations = Reservations.where(:login => login).order(time: :desc).limit(3)

		response.headers['Content-Type'] = 'application/json'
        render :text => @reservations.to_json, :layout => false
    end    
end 

end
