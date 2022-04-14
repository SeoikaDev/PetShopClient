import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartModel } from 'src/app/model/Cart';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
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
  validateForm !: FormGroup;

  constructor(private cartService : CartService,
    private userService : UserService,
    private message: NzMessageService,
    private fb: FormBuilder,
    private orderService : OrderService) { }

  ngOnInit(): void {
    this.cartInfo();
    this.validateForm = this.fb.group({
      payment_method: [null],
      payment_account: [null],
      receive_method: [null],
      type : ['product']
    });
  }

  purchaseCart(): void {
    if (this.validateForm.valid) {
      let data = {
        cart : this.products,
        type : this.validateForm.get('type')?.value,
        total_price : this.total,
        payment_method : this.validateForm.get('payment_method')?.value,
        payment_account: this.validateForm.get('payment_account')?.value,
        receive_method: this.validateForm.get('receive_method')?.value,
      }
      this.orderService.addOrder(data).subscribe((res : any) => {
        if(res.status === 'ok'){      
          this.cartService.clearCart().subscribe((res : any) => {});
          this.message.create('success', res.info);        
          this.products = [];
          this.validateForm.reset();
          window.location.reload();
        }
        else
        {
          this.message.create('error', res.error);
        }
      });
      // console.log(this.products);
      // console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  changeQuantity(product : any, event : any){
    let data = {
      amount : event,
      id : product._id
    };
    this.cartService.updateCart(data).subscribe((res : any) => {
      if(res.status === 'ok'){
        window.location.reload();
        this.message.create('success', res.info);
      }
      else{
        this.message.create('error', res.error);
      }
    });
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
          window.location.reload();
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
          this.message.create('success', 'Xóa giỏ hàng thành công');
        }
      }
    )
  }


}
