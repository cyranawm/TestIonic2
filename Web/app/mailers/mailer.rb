class Mailer < ActionMailer::Base
  default from: "statioguide@technolia.fr"

def time_diff(start_time, end_time)
  seconds_diff = (start_time - end_time).to_i.abs
  hours = seconds_diff / 3600
  seconds_diff -= hours * 3600
  minutes = seconds_diff / 60
  seconds_diff -= minutes * 60
  seconds = seconds_diff
  if hours == 0
    "#{minutes.to_s.rjust(2, '0')} minute(s)"
  else
    "#{hours.to_s.rjust(2, '0')} heure(s) et #{minutes.to_s.rjust(2, '0')} minute(s)"
  end
end
  def sample_email(email,start_time,temps_restant,spotid)
  	now = Time.new()
    vehicle= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/"+spotid+"/logs/current_statuses", 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
    @park_time = vehicle["statuses"]["vehicle_detected"]["date"] 
    @park_time =  DateTime.parse(@park_time).to_time
    @park_time=@park_time.strftime("%d-%m-%Y %H:%M")
    @start_time = DateTime.parse(start_time).to_time
    @start_time=@start_time.strftime("%d-%m-%Y %H:%M")
    if vehicle["statuses"]["vehicle_detected"]["value"] == 1 && @park_time == @start_time
  	if temps_restant > now
  	spot= JSON.parse(RestClient::Request.execute(
        :url => "https://api.technolia.fr/spots/"+spotid, 
        :method => :get,
        :verify_ssl => false, 
        :headers => {
          :accept => 'application/json'
          }))
  	@spot_id = spot["id"]
  	@spot_type = spot["spot_type"]
  	@spot_address = spot["location"]["address"]
  	@spot_town = spot["location"]["town"]
  	@start_time = DateTime.parse(start_time).to_time
  	@start_time=@start_time.strftime("%d-%m-%Y %H:%M")
    @end_time=temps_restant.strftime("%d-%m-%Y %H:%M")
    @time=time_diff(now,temps_restant)
    mail(to: email, subject: 'Expiration de votre stationnement')
    end
  	end
  end
end

