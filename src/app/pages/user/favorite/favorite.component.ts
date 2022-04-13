import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { FavoriteModel } from 'src/app/model/Favorite';
import { ProductModel } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
import { HistoryService } from 'src/app/services/history.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favorites : any[] = [];

  constructor(private productService : ProductService,
    private userService : UserService,
    private cartService : CartService,
    private historyService : HistoryService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.getFavorites();
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

  getFavorites(){
    this.userService.getCurrentUserListCart().subscribe((res : any )=> {
      if(res.status == 'ok'){
        let item = res.data.favorite;
        this.favorites = res.data.favorite;
        console.log(res.data.favorite);
      }
    })
  }

  addHistory(id : any){
    let item = {
      id : id
    };
    this.historyService.addHistory(item).subscribe(resp =>{
      if(resp.status == 'ok'){
        this.message.create('success', resp.info);
      }
      else{
        this.message.create('error', resp.error);
      }
    });
  }

  removeFavorite(id : any){
    console.log(id);
      let item = {
        id : id
      };
      this.productService.deleteFavorite(item).subscribe(
        (res :any )=> {
          if(res.status == 'ok'){
            this.message.create('success', res.info);
          }
          else{
            this.message.create('error', res.error);
          }
        }
      );
  }

}
