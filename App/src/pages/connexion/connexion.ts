import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ForgotPasswordPage } from "../forgot-password/forgot-password";

/**
 * Generated class for the ConnexionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public  modalCtrl: ModalController ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }
  view_forgot(){
    let newModal = this.modalCtrl.create(ForgotPasswordPage);
    newModal.present();
  }
}
