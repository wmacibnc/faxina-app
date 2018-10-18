import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-detalhar',
  templateUrl: 'detalhar.html'
})
export class DetalharPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');    
  }

  finalizar(){
    const alert = this.alertCtrl.create({
      title: 'Finalizado',
      subTitle: 'Serviço agendado com sucesso!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(HomePage);
  }
}
