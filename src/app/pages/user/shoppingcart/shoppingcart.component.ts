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
  _id = '';

  constructor(private cartService : CartService,  
    private userService : UserService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.cartInfo();
  }

  changeQuantity(event : any){
    console.log(event);
  }

  cartInfo(){
    this.userService.getCurrentUserListCart().subscribe((res : any) => { 
      if(res.status === 'ok'){
        this.products = res.data.cart;
        this._id = res.data._id;
        console.log(this.products);
      }
    });
  }

  deleteProduct(id : any){
    this.products = this.products.filter((item : any )=> item._id !== id);
    // this.cartService.deleteCart(id).subscribe(
    //   (resp : any ) =>  {
    //     if(resp.status == 'ok'){
    //       this.products = resp.data.filter((item : any )=> item.product._id == id);
    //       this.message.create('success', 'Xóa sản phẩm thành công');
    //     }
    //   }
    // )
  }

  clearCart(){
    console.log(this._id);
    this.cartService.deleteCart(this._id).subscribe(
      (resp : any ) =>  {
        if(resp.status == 'ok'){
          this.products = [];
          this.message.create('success', 'Xóa sản phẩm thành công');
        }
      }
    )
  }

}
