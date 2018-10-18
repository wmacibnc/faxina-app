import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContratarPage } from '../contratar/contratar';
import { NovoPage } from '../novo/novo';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  }
  
  contratar(){
    this.navCtrl.push(ContratarPage);
  }

  novo(){
    this.navCtrl.push(NovoPage);
  }

}
