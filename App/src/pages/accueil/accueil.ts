import { Component , OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as L from 'leaflet';



@IonicPage()
@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html',
})
export class AccueilPage implements OnInit {
  Minute_is_pressed: boolean = false;
  Elec_is_pressed:boolean = false;
  Pass_is_pressed:boolean = false;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit(): void {
    this.drawMap();
  }
  /*Instructions pour gestion FabButtons*/
  Minute_Pressed(){
    this.Minute_is_pressed=!(this.Minute_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }
  Elec_Pressed(){
    this.Elec_is_pressed=!(this.Elec_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }
  Pass_Pressed(){
    this.Pass_is_pressed=!(this.Pass_is_pressed);
    /*Aller chercher dans BDD les emplacements*/
  }




  /*Instructions pour affichage carte :*/
  drawMap(): void {
   var map = L.map('map',{zoomControl:false })
      .setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:20,maxNativeZoom:19}).addTo(map);  
  }
}
