import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnexionPage } from './connexion';
import { IonicStorageModule } from "@ionic/storage/es2015";
import { ForgotPasswordPage } from "../forgot-password/forgot-password";


@NgModule({
  declarations: [
    ConnexionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnexionPage),
    IonicStorageModule.forRoot(),
      ],
  exports: [
    ConnexionPage,
  ]
})
export class ConnexionPageModule {}
