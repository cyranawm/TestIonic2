import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Loading, AlertController, LoadingController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service/auth-service";
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
  loading: Loading;
  registerCredentials = { email: '', password: '' };
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController,private modalCtrl:ModalController) { }
 
  public forgot() {
      let newModal = this.modalCtrl.create(ForgotPasswordPage);
    newModal.present();
  }
 
  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('AccueilPage');
      } else {
        this.showError("Veuillez réessayer");
      }
    },
      error => {
        this.showError(error);
      });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Connexion en cours ...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Connexion impossible',
      subTitle: text,
      buttons: ['Ok']
    });
    alert.present(prompt);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
  }
}
