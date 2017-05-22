class Users::RegistrationsController < Devise::RegistrationsController

  def new
    @title = "Inscription"
    super
  end
  # POST /resource
  def create
    if captcha_valid? params[:captcha]
        super
    else
        build_resource(sign_up_params)
        flash.now[:error] = "Le captcha est incorrecte, merci de réessayer"
        render :new
    end
  end

  def update
    super
      login = current_user.email
      update = Reservations.where('login LIKE ?', login).update_all(login: resource.email)

  end

end
