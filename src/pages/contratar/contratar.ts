import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController  } from 'ionic-angular';
import { ListPage} from '../list/list';

import { Http } from '@angular/http';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as moment from 'moment';

@Component({
  selector: 'page-contratar',
  templateUrl: 'contratar.html',
})

export class ContratarPage {
  comodo : any;
  endereco: any;
  
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false, title:''};
  minDate = new Date().toISOString();
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController
    ) {
      let preselectedDate = moment(this.navParams.get('selectedDay')).format();
      this.event.startTime = preselectedDate;
      this.event.endTime = preselectedDate;
      this.comodo = 0;
    }
    
    
    
    addEvent() {
      debugger
      let eventData = {startTime: new Date(this.event.startTime), endTime: new Date(this.event.endTime), allDay:this.event.allDay, title:this.event.title}; 
      let events = this.eventSource;
      events.push(eventData);
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = events;
      });
    }
    
    
    onViewTitleChanged(title) {
      this.viewTitle = title;
    }
    
    onEventSelected(event) {
      let start = moment(event.startTime).format('LLLL');
      let end = moment(event.endTime).format('LLLL');
      
      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      })
      alert.present();
    }
    
    onTimeSelected(ev) {
      this.selectedDay = ev.selectedTime;
    }
    
    cancel() {
      this.viewCtrl.dismiss();
    }
    
    save() {
      this.addEvent();
    }
    
    
    
    
    
    encontrarProfissional() {
      this.navCtrl.push(ListPage);
    }
    
    // alterou(valor){
    //   this.comodo = (Math.random() * valor.comodo).toFixed(2);
    // }
    
    obterEndereco(valor){
      if(valor && valor.cep && valor.cep.length == 8){
        this.http.get('https://viacep.com.br/ws/'+valor.cep+'/json/')
        .map(res => res.json())
        .subscribe(data => {
          this.comodo = this.comodo + 1;
          if( (this.comodo && (this.comodo % 2 ) ) == 0){
            const alert = this.alertCtrl.create({
              title: 'Localidade Não atendida',
              subTitle: 'Desculpe ainda não temos profissionais para sua região!',
              buttons: ['OK']
            });
            alert.present();
          }
          
          this.endereco = data.complemento + " " + data.logradouro + " - " + data.bairro + " - " + data.localidade + "/" + data.uf + " - " + data.cep;                
        });
      }
    }
    
  }
  