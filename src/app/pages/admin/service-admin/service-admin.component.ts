import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ServiceModel } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-admin',
  templateUrl: './service-admin.component.html',
  styleUrls: ['./service-admin.component.css']
})
export class ServiceAdminComponent implements OnInit {
  service !: ServiceModel ;
  services : ServiceModel[] = [];
  form !: FormGroup;

  constructor(private message: NzMessageService,
    private serviceService : ServiceService,
    private fb : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.getServices();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      price: [0, [Validators.required]],
      type: [null, [Validators.required]],
    });
  }

  getServices(){
    this.serviceService.getServices().subscribe(
      res => {
        if(res.status == 'ok'){
          console.log(res.data);
          this.services = res.data;
        }
      }
    );
  }

  selectService(id : any){
    this.router.navigate([`admin/service-detail/${id}`]);
  }

  addService(): void {
    if (this.form.valid) {
      this.serviceService.addServices(this.form.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.services.push(this.form.value);
            this.message.create('success', 'Added service success!');
          }
          else{
            this.message.create('error', 'Added service failure!');
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

  deleteService(service : ServiceModel){
    console.log(service);
    this.serviceService.deleteServices(service).subscribe(
      (res : any )=> {
        if(res.status == 'ok'){
          this.services.filter(ser => ser._id === service._id);
          this.message.create('success', res.info);
        }
        else{
          this.message.create('error', res.error);
        }
      }
    );
  }


}
