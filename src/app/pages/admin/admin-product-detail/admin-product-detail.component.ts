import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.css']
})
export class AdminProductDetailComponent implements OnInit {

  products : any[] = [];
  form !: FormGroup;
  constructor(private message: NzMessageService,
    private productService : ProductService,
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router : Router,) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        console.log(params['id']);
        this.getProductById(id);
      });
    this.form = this.fb.group({
      _id: [null, [Validators.required]],
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

  getProductById(_id : any){
    this.productService.getProductsById(_id).subscribe(
      res => {
        if(res.status  == 'ok'){
          console.log(res.data);
          this.form.patchValue(res.data);
        }
      }
    );
  }

  updateProduct(): void {
    if (this.form.valid) {
      this.productService.updateProduct(this.form.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.form.reset();
            this.message.create('success', res.info);
            this.router.navigate(['/admin/product']);
          }
          else{
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
}
