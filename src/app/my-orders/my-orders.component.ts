import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$;
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
   
      this.orders$ = orderService.getOrders();
    } 
  }

// export class MyOrdersComponent {

//   orders$;

//   constructor(
//     private authService: AuthService,
//     private orderService: OrderService) { }

//   ngOnInit() {
//     this.authService.user$.subscribe(user => {
//       if (user) {
//         this.orders$ = this.orderService.getOrdersByUser(user.uid);
//       }
//     });
//   }
// }
