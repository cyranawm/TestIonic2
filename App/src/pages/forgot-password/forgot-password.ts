import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public  viewCtrl: ViewController, public alertCtrl: AlertController){

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  Return() {
    this.viewCtrl.dismiss();
  }

  showAlert_sucess() {
  let alert = this.alertCtrl.create({
      title: 'Envoi réussi',
      subTitle: 'Vous allez recevoir par e-mail les instructions nécessaires à la réinitialisation de votre mot de passe',
      buttons: ['Ok']
    });
    alert.present();
  }

  Send_instructions(){
    this.viewCtrl.dismiss();
    /* Ajouter instruction d'envoi réinitialisation mot de passe */
    this.showAlert_sucess();
  }

}
