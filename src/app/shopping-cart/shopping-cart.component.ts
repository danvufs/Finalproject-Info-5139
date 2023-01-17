import { AngularFireObject } from '@angular/fire/compat/database';
import { ShoppingCartItem } from './../models/shopping-cart-item';
import { Product } from './../models/product';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  
  cart$:any;
 

  constructor(private shoppingCartService : ShoppingCartService, private router: Router) { 
  }
  
  async ngOnInit() {
   this.cart$= await this.shoppingCartService.getCart();
  }

  clearCart(){
    
    if(window.confirm("Are you sure you want to clear your shopping cart?")){
      this.shoppingCartService.clearCart();
      window.alert("You deleted all items from your cart.");
      
    }
    
  }
}