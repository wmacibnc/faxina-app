import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';

import { Http } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'page-novo',
  templateUrl: 'novo.html'
})
export class NovoPage {
  endereco: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public http: Http) {    
  }
  
  obterEndereco(valor){
    if(valor && valor.cep && valor.cep.length == 8){
      this.http.get('https://viacep.com.br/ws/'+valor.cep+'/json/')
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
        this.endereco = data.complemento + " " + data.logradouro + " - " + data.bairro + " - " + data.localidade + "/" + data.uf + " - " + data.cep;                
      });
    }
  }
  
  finalizar(){
    const alert = this.alertCtrl.create({
      title: 'Finalizado',
      subTitle: 'Cadastro realizado com sucesso!',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(HomePage);
  }
}
