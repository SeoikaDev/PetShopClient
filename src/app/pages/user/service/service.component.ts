import { Component, OnInit } from '@angular/core';
import { ServiceModel } from 'src/app/model/Service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  services : ServiceModel[] = [];
  isVisible = false;

  constructor(private serviceService : ServiceService) { }

  ngOnInit(): void {
    this.getServices();
  }

  showModal(){
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  getServices(){
    this.serviceService.getServices().subscribe(resp => {
      if(resp.status == 'ok'){
        this.services = resp.data;
      }
    });
  }

}
