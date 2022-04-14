import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServiceModel } from "src/app/model/ServiceModel";
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-admin-detail',
  templateUrl: './service-admin-detail.component.html',
  styleUrls: ['./service-admin-detail.component.css']
})
export class ServiceAdminDetailComponent implements OnInit {
  form !: FormGroup;

  constructor(private message: NzMessageService,
    private serviceService : ServiceService,
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private router : Router) {
    }


  ngOnInit(): void {
    this.form = this.fb.group({
        _id : [null, Validators.required],
        name : [null, Validators.required],
        price : [null, Validators.required],
        type : [null, Validators.required]
      });

    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        console.log(params['id']);
        this.getServiceById(id);
      });

  }

  getServiceById(_id : any){
    this.serviceService.getServiceById(_id).subscribe(
      res => {
        if(res.status  == 'ok'){
          console.log(res.data);
          this.form.patchValue( res.data);
        }
      }
    );
  }

  updateService(): void {
    if (this.form.valid) {
      this.serviceService.updateServices(this.form.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.form.reset();
            this.message.create('success', res.info);
            this.router.navigate(['/admin/service']);
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
