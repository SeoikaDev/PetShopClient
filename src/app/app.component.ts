import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isCollapsed = false;
  cart = [];
  quantityCart = 0;


  constructor(private userService : UserService,
    private router : Router){

  }

  ngOnInit(): void {
    this.userService.getCurrentUserListCart().subscribe((res : any) => { 
      if(res.status === 'ok'){
        this.cart = res.data.cart;
        this.cart.forEach((ele : any )=> {
          this.quantityCart += ele.amount;
        });
      }
      console.log(res);
    });
  }

  cartPage(){
    this.router.navigate(['/shoppingcart']);
  }

}
