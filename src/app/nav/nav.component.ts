// import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';
// import * as firebase from 'firebase/auth';
// import { ShoppingCart } from '../models/shopping-cart';
// import { ShoppingCartService } from '../services/shopping-cart.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-nav',
//   templateUrl: './nav.component.html',
//   styleUrls: ['./nav.component.css']
// })
// export class NavComponent implements OnInit {
//   cart$: Observable<ShoppingCart>;
  
//   constructor(public auth:AuthService, private shoppingCartService: ShoppingCartService, private route: Router) {

//   }

//   async ngOnInit() {
//     this.cart$= await this.shoppingCartService.getCart();
    
//   }

//   logout() {
//       this.auth.logout();
//   }

// }


import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as firebase from 'firebase/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
  //isDarkMode = false;
  
  constructor(private shoppingCartService: ShoppingCartService, public auth:AuthService) { }

  modeLocal = localStorage.getItem('darkmode')
  mode = this.modeLocal == null ? false : JSON.parse(this.modeLocal)

  toggleMode = () => {
    this.mode = !this.mode
    this.setMode(this.mode)
  }

  setMode = (value: boolean) => {
    localStorage.setItem('darkmode', JSON.stringify(value))

    if (value) {
      document.body.classList.add('darkmode')
      document.body.classList.remove('lightmode')
    } else {
      document.body.classList.add('lightmode')
      document.body.classList.remove('darkmode')
    }
  }

  async ngOnInit() {
    this.cart$= await this.shoppingCartService.getCart();
    this.setMode(this.mode);
  }

  // toggleDarkMode() {
  //   this.isDarkMode = !this.isDarkMode;

  //   if (this.isDarkMode) {
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     document.body.classList.remove('dark-mode');
  //   }
  // }

  logout() {
    this.auth.logout();
  }
}
