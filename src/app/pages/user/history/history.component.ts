import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  histories : any[] = [];
  constructor(private productService : ProductService,
    private userService : UserService,
    private cartService : CartService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getHistory();
  }

  addCart(product : any){
    this.cartService.addCart(product).subscribe((res : any) => {
      if(res.status === 'ok'){
        this.userService.getCurrentUserListCart()
        .subscribe((res : any) => {
          if(res.status === 'ok'){
            this.message.create('success', 'Thêm vào giỏ hàng thành công');
            // this.cart = res.cart;
          }
          else{
            this.message.create('warning', 'Thêm vào giỏ hàng thất bại');
          }
          console.log(res);
        });
      }
    });
  }

  getHistory(){
    this.userService.getCurrentUserListCart().subscribe((res : any )=> {
      if(res.status == 'ok'){
        this.histories = res.data.history;
        console.log(res.data.favorite);
      }
    })
  }

  addFavorite(id : any){
    let item = {
      id : id
    };
    this.productService.addFavorite(item).subscribe(resp =>{
      if(resp.status == 'ok'){
        this.message.create('success', resp.info);
      }else{
        this.message.create('error', resp.error);
      }
    });
  }
}
