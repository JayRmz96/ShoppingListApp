import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage } from "ionic-angular";
import {ShoppingListService} from "../../services/shopping-list/shopping-list.service";
import {Observable} from "rxjs";
import {Item} from "../../models/item/item.model";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;
  constructor(public navCtrl: NavController, private shopping: ShoppingListService) {
    this.shoppingList$ = this.shopping
      .getShoppingList()  //Returns a DB List
      .snapshotChanges() //Return Key and value pairs
      .map(
        changes =>{
              return changes.map( c=> ({
                      key: c.payload.key, ...c.payload.val()
              }));
        });
  }

}
