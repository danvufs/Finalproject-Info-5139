import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { OrderService } from './../services/order.service';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = { name: '', address: '', city: '' };
  uderId: string;
  cart: ShoppingCart;
  cartSubscribtion: Subscription;
  userSubscribtion: Subscription;  

  constructor(private router: Router,
              private authService: AuthService, 
              private orderService: OrderService, 
              private shoppingCartService: ShoppingCartService)
               { 

               }

  async ngOnInit() {
    let cart$=await this.shoppingCartService.getCart();
    this.cartSubscribtion=cart$.subscribe(cart=>this.cart=cart);
    this.userSubscribtion=this.authService.user$.subscribe(user=>this.uderId=user.uid)
  }

  ngOnDestroy(): void {
   this.cartSubscribtion.unsubscribe();
   this.userSubscribtion.unsubscribe();
  }

 async placeOrder() {
    let order={
      userId: this.uderId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart.items.map(i=>{
        return{
          product:{
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };
    //console.log(order);
    let result=await this.orderService.storeOrder(order);
    this.shoppingCartService.clearCart();
    //Alert user that order is placed
    alert('Order placed successfully');
    //redirect user to the products page
    this.router.navigate(['/products']);
  }

}