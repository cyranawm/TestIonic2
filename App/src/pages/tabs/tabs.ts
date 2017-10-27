import { Component } from '@angular/core';
import { AccueilPage } from '../accueil/accueil';
import { AidePage } from "../aide/aide";
import { ConnexionPage } from "../connexion/connexion";
import { BookingPage } from "../booking/booking";
import { InscriptionPage } from "../inscription/inscription";
import { MonComptePage } from "../mon-compte/mon-compte";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccueilPage;
  tab2Root = AidePage;
  tab3Root = BookingPage;
  tab4Root = InscriptionPage;
  tab5Root = MonComptePage;
  constructor() {

  }
}
