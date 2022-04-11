import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Params} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product : any;

  constructor(private productService : ProductService,
    private route: ActivatedRoute,
    private cartService : CartService,
    private userService : UserService,
    private message: NzMessageService) { }

  ngOnInit(): void {


    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        console.log(params['id']);
        this.getProductById(id);
      }
      );
  }

  getProductById(id : any){
          this.productService.getProductsById(id)
          .subscribe(resp => {
            if(resp.status == 'ok'){
              console.log(resp.data);
              this.product = resp.data;
            }
          });
  }

  addFavorite(id : any){
    this.productService.addFavorite(id).subscribe(resp =>{
      if(resp.status == 'ok'){
        this.message.create('success', 'Yêu thích thành công');
      }
    });
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

}
