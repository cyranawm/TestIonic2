import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from "../../providers/auth-service/auth-service";

/**
 * Generated class for the InscriptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '' , confirm_password: ''};
 
  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController) { }
 
  public register() {
    if (this.registerCredentials.password !== this.registerCredentials.confirm_password) {
    this.showPopup("Erreur", "Les mots de passe ne correspondent pas");
    } else {
    this.auth.register(this.registerCredentials).subscribe(success => {
      if (success) {
        this.createSuccess = true;
        this.showPopup("Succès", "Le compte à bien été crée.");
      } else {
        this.showPopup("Erreur", "Erreur lors de la création du compte.");
      }
    },
      error => {
        this.showPopup("Erreur", error);
      });
   }
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

}
