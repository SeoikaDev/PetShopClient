import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { FavoriteModel } from 'src/app/model/Favorite';
import { ProductModel } from 'src/app/model/Product';
import { CartService } from 'src/app/services/cart.service';
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
        item.forEach((ele : any) => {
          console.log(ele._id);   
            this.productService.getProductsById(ele._id)
              .subscribe((data : ProductModel) => {
                console.log(data);   
                this.favorites.push(data);
          });
        });
        
        // this.favorites = res.data.favorite;
        // console.log(res.data.favorite);
      }
    })
  }

}
