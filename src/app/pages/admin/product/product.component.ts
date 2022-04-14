import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductModel } from 'src/app/model/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products : any[] = [];
  form !: FormGroup;

  loading = false;
  avatarUrl?: string;

  constructor(private message: NzMessageService,
    private productService : ProductService,
    private fb : FormBuilder,
    private router : Router,
    ) { }

  ngOnInit(): void {
    this.getProducts();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      category: [null, [Validators.required]],
      price: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      // image: [null, [Validators.required]],
      benefit: [null, [Validators.required]],
      how_to_use: [null, [Validators.required]],
      description : [null]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  selectProduct(id : any){
    console.log(id);
    this.router.navigate([`admin/product-detail/${id}`]);
  }

  addProduct(): void {
    if (this.form.valid) {
      this.productService.addProduct(this.form.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.form.reset();
            this.message.create('success', res.info);
          }else{
            this.message.create('error', res.error);
          }
        }
      );
      console.log('submit', this.form.value);
    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        if(res.status == 'ok'){
          console.log(res.data);
          this.products = res.data;
        }
      }
    );
  }
  deleteProduct(product : ProductModel){
    console.log(product);
    this.productService.deleteProduct(product._id).subscribe(
      (res : any )=> {
        if(res.status == 'ok'){
          this.products.filter(pro => pro._id == product._id);
          this.form.reset();
          this.message.create('success', res.info);
          this.router.navigate(['/admin/product']);
        }
        else{
          this.message.create('error', res.error);
        }
      })
  }

  // beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  //   new Observable((observer: Observer<boolean>) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //     if (!isJpgOrPng) {
  //       this.msg.error('You can only upload JPG file!');
  //       observer.complete();
  //       return;
  //     }
  //     const isLt2M = file.size! / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.msg.error('Image must smaller than 2MB!');
  //       observer.complete();
  //       return;
  //     }
  //     observer.next(isJpgOrPng && isLt2M);
  //     observer.complete();
  //   });

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result!.toString()));
  //   reader.readAsDataURL(img);
  // }

  // handleChange(info: { file: NzUploadFile }): void {
  //   switch (info.file.status) {
  //     case 'uploading':
  //       this.loading = true;
  //       break;
  //     case 'done':
  //       // Get this url from response in real world.
  //       this.getBase64(info.file!.originFileObj!, (img: string) => {
  //         this.loading = false;
  //         this.avatarUrl = img;
  //       });
  //       break;
  //     case 'error':
  //       this.msg.error('Network error');
  //       this.loading = false;
  //       break;
  //   }
  // }
}
