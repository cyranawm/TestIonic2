Rails.application.routes.draw do
  captcha_route
  devise_for :users,:controllers => {:sessions => "users/sessions",:registrations => "users/registrations"}
  #root 
  get "/" => "locate#index", :as => "root"
  post '/' => 'locate#index'

  #locate controller
  get '/locate' => 'locate#index'
  post '/locate' => 'locate#index'
  get '/aide' => 'aide#index'

  #spot controller data from API
  get '/status' => 'spot#statusbyspot'
  get '/getspot' => 'spot#getspotbylatlng'
  get '/allstatus' => 'spot#allstatus'
  get '/spotcalendar' => 'spot#getspotcalendar'
  get '/gettime' => 'spot#gettime'
  get '/getlaststatus' => 'spot#getlaststatus'
  get '/getbookings' => 'bookings#getbookings'
  get '/getspotbyid' => 'spot#getspotbyid'
  post '/createbooking' => 'bookings#createbooking'
  post '/validatebooking' => 'bookings#validatebooking'
  post '/validatebookingbypass' => 'bookings#validatebookingbypass'
  post '/deletebooking' => 'bookings#deletebooking'
  post '/sendemail' => 'bookings#send_email'

end
