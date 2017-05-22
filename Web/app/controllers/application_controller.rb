class ApplicationController < ActionController::Base
  # reset captcha code after each request for security
  after_filter :reset_last_captcha_code!

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?
  prepend_before_filter :disable_devise_trackable

protected
	  def disable_devise_trackable
	    request.env["devise.skip_trackable"] = true
	  end

          def configure_permitted_parameters
            devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:name, :email, :password,:password_confirmation,:immatriculation) }
            devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:email, :password, :current_password,:password_confirmation,:immatriculation,:accept_notification) }
          end
        
end
