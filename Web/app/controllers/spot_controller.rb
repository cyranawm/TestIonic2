class SpotController < ApplicationController
require 'rest-client'

#Affiche tout les spots pret de la position geolocoalisé ou taper dans la barre de recherche (recherche par latitude et longitude sur une distance de 20KM). 
   def getspotbylatlng()
    begin
       requete= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots?limit=10000", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))

       spot = requete.to_json
       spot=JSON.parse(spot)
       spot=spot["spots"]
      tableau= Array.new
      for spot in spot
            lat = spot["location"]["gps"]["latitude"]
            lng = spot["location"]["gps"]["longitude"]
            id = spot["id"]
            type_spot = spot["spot_type"]
            address = spot["location"]["address"]
            city = spot["location"]["town"]
            links = spot["links"]["device"]["href"]
       a = Geokit::LatLng.new(lat,lng)
       b = Geokit::LatLng.new(params[:lat],params[:lng])
      distance=a.distance_to(b)
      distance=(distance*1.609).round(2) #passage de miles en KM
        if distance <= 20
          tableau.push("id" => id,"longitude" => lng ,"latitude" => lat, "distance" => distance, "spot_type" => type_spot, "address" => address,"city"=>city,"links" =>links)                
        end
      end
    response.headers['Content-Type'] = 'application/json'
    render :text => tableau.to_json, :layout => false
    rescue
    end
  end

#recupere le statut du spot concerné et renvoie du JSON
 def statusbyspot()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/#{params[:spot]}/logs/current_statuses", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
        @etat = etat["statuses"]
         response.headers['Content-Type'] = 'application/json'
        render :text => @etat.to_json, :layout => false

    rescue
    end    
  end


   def allstatus()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/logs/current_statuses", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
       @etat = etat["statuses"]
         response.headers['Content-Type'] = 'application/json'
        render :text => @etat.to_json, :layout => false
    rescue
    end    
  end



  def getspotcalendar()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/#{params[:spot]}/calendar_active", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
       @etat = etat["calendar"]
         response.headers['Content-Type'] = 'application/json'
        render :text => @etat.to_json, :layout => false
    rescue
    end    
  end



  def gettime()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/devices/#{params[:spot]}/config_active", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
       
       
       @etat = etat["config_items"].to_json
       @etat=JSON.parse(@etat)
       for etat in @etat
        if etat["name"]=="SP_TIM"
         response.headers['Content-Type'] = 'application/json'
         render :text => etat.to_json, :layout => false
        elsif etat["name"]=="SM_TIM"
         response.headers['Content-Type'] = 'application/json'
         render :text => etat.to_json, :layout => false
       elsif etat["name"]=="parking_time"
         response.headers['Content-Type'] = 'application/json'
         render :text => etat.to_json, :layout => false
           

        end
       end
    rescue
    end  
  end


    def getlaststatus()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/#{params[:spot]}/logs/current_statuses", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
       @etat = etat["statuses"]
         response.headers['Content-Type'] = 'application/json'
        render :text => @etat.to_json, :layout => false
    rescue
    end  
  end



    def getspotbyid()
     begin
       etat= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/#{params[:spot]}", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
         response.headers['Content-Type'] = 'application/json'
        render :text => etat.to_json, :layout => false
    rescue
    end  
  end

end
