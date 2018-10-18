import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage} from '../list/list';

import { Http } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'page-contratar',
  templateUrl: 'contratar.html',
})
export class ContratarPage {
  comodo: any;
  endereco: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }
  
  encontrarProfissional() {
    this.navCtrl.push(ListPage);
  }
  
  alterou(valor){
    this.comodo = (Math.random() * valor.comodo).toFixed(2);
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
  
}
