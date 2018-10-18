import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DetalharPage } from '../detalhar/detalhar';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['woman', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      if((i%2) == 0){
        this.items.push({
          title: 'Maria Oliveira ' + i,
          note: ''+(Math.random() * 5).toFixed(0),
          icon: 'woman'
        });
      }else{
        this.items.push({
          title: 'João da Silva ' + i,
          note: '' + (Math.random() * 5).toFixed(0),
          icon: 'build'
        });
      }
    }
  }

  itemTapped(event, item) {

    this.navCtrl.push(DetalharPage, {
      item: item
    });
  }
}
