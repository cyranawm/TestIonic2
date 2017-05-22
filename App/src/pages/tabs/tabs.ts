import { Component } from '@angular/core';

import { AccueilPage } from '../accueil/accueil';
import { AidePage } from "../aide/aide";
import { ConnexionPage } from "../connexion/connexion";
import { InscriptionPage } from "../inscription/inscription";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AccueilPage;
  tab2Root = AidePage;
  tab3Root = ConnexionPage;
  tab4Root = InscriptionPage

  constructor() {

  }
}
