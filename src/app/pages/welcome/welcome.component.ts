import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer} from '@angular/platform-browser'
import { UploadService } from 'src/app/services/upload.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  cart = [];
  products : any = [];
  image !: Observable<any>;
  listImage  = ["/product_image/house/img_product_house_6.jpg",
  "/product_image/clothes/img_product_clothes_10.jpg",
  "/product_image/clothes/img_product_clothes_1.jpg"]
  profileUrl !: Observable<any>;
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };


  constructor(private productService : ProductService,
    private storage: AngularFireStorage,
    public sanitizer: DomSanitizer,
    private cartService : CartService,  
    private userService : UserService,
    private message: NzMessageService) {

    }

  ngOnInit() {
    this.productService.getProducts().subscribe(resp =>{
      this.products = resp.data;
      console.log(resp.data);
      let imgs = "/product_image/house/img_product_house_6.jpg";
      this.listImage.forEach((ele : any)=> {
         const ref = this.storage.ref(ele);
          this.image = ref.getDownloadURL();      
      })
    });
  }

  addCart(product : any){
    this.cartService.addCart(product).subscribe((res : any) => {
      if(res.status === 'ok'){
        this.userService.getCurrentUserListCart()
        .subscribe((res : any) => { 
          if(res.status === 'ok'){  
            
            this.message.create('success', 'Thêm vào giỏ hàng thành công');
            this.cart = res.cart;
          }
          else{
            this.message.create('warning', 'Thêm vào giỏ hàng thất bại');
          }
          console.log(res);
        });
      }
    });
  }

  displayImage(imageRef : any) {
    // let img = `/product_image/clothes/${imageRef}`;
    const ref = this.storage.ref(imageRef);
     ref.getDownloadURL().subscribe(a => this.image = a);
     return this.image;
      // this.profileUrl.subscribe(a => console.log(a));

    // console.log(ref.getDownloadURL);
  }


}
