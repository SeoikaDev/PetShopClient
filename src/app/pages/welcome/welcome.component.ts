import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer} from '@angular/platform-browser'
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
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
    public sanitizer: DomSanitizer) {

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

  displayImage(imageRef : any) {
    // let img = `/product_image/clothes/${imageRef}`;
    const ref = this.storage.ref(imageRef);
     ref.getDownloadURL().subscribe(a => this.image = a);
     return this.image;
      // this.profileUrl.subscribe(a => console.log(a));

    // console.log(ref.getDownloadURL);
  }

  addCart(product : any){
    console.log(product);
  }

}
