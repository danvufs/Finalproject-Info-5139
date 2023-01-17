import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/auth';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  
  constructor(public auth:AuthService, private shoppingCartService: ShoppingCartService, private route: Router) {

  }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    
  }

  logout() {
      this.auth.logout();
  }

}
