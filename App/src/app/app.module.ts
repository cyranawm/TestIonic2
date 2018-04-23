import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AccueilPage } from "../pages/accueil/accueil";
import { AidePage } from "../pages/aide/aide";
import { ConnexionPage } from "../pages/connexion/connexion";
import { BookingPage } from "../pages/booking/booking";
import { InscriptionPage } from "../pages/inscription/inscription";
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { ForgotPasswordPage } from "../pages/forgot-password/forgot-password";
import { MonComptePage } from "../pages/mon-compte/mon-compte";
import { AuthService } from './../providers/auth-service/auth-service';
import { RestApiServiceProvider } from '../providers/rest-api-service/rest-api-service';
import { HttpModule } from '@angular/http';
import { BookingdataProvider } from '../providers/bookingdata/bookingdata';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,    
    AccueilPage,
    BookingPage,    
    AidePage,
    ConnexionPage,
    InscriptionPage,
    MonComptePage,
    ForgotPasswordPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestApiServiceProvider,
    AuthService,
    BookingdataProvider,
    Geolocation,
      ]
})
export class AppModule {}
