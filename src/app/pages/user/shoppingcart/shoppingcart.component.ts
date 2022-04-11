import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartModel } from 'src/app/model/Cart';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit {
  products : CartModel[] = [];
  total = 0;
  _id = '';

  constructor(private cartService : CartService,  
    private userService : UserService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.cartInfo();
  }

  changeQuantity(product : any, event : any){
    console.log(product);
    this.products.forEach(ele => {
      if(product._id == ele._id && product.amount > event){
        ele.amount = event;      
        this.total += (100 * ele.amount * ele.product.price * (1 - 0.01 * ele.product.discount)) / 100;
      }

      if(product._id == ele._id && product.amount < event){
        ele.amount = event;      
        this.total -= (100 * ele.amount * ele.product.price * (1 - 0.01 * ele.product.discount)) / 100;
      }
    });
    console.log(event);
  }

  cartInfo(){
    this.userService.getCurrentUserListCart().subscribe((res : any) => { 
      if(res.status === 'ok'){
        this.products = res.data.cart;
        this._id = res.data._id;
        // (100 * data.amount * data.product.price * (1 - 0.01 * data.product.discount)) / 100
        this.products.forEach(ele => {
          this.total += (100 * ele.amount * ele.product.price * (1 - 0.01 * ele.product.discount)) / 100;
        });
        console.log(res.data);
      }
    });
  }

  deleteProduct(id : any){
    // this.products = this.products.filter((item : any )=> item._id !== id);
    this.cartService.deleteCart(id).subscribe(
      (resp : any ) =>  {
        if(resp.status == 'ok'){
          // this.products = this.products.filter((item : any )=> item._id !== id);
          this.message.create('success', 'Xóa sản phẩm thành công');
        }
      }
    )
  }

  clearCart(){
       this.cartService.clearCart().subscribe(
      (resp : any ) =>  {
        if(resp.status == 'ok'){
          this.products = [];
          this.message.create('success', 'Xóa sản phẩm thành công');
        }
      }
    )
  }

}
