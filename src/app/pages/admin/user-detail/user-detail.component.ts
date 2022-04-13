import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  form !: FormGroup;
  constructor(private message: NzMessageService,
    private userService : UserService,
    private fb : FormBuilder,
    private router : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      fullname: [null],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      phoneNumberPrefix: ['+84'],
      phoneNumber: [null, [Validators.required]],
      role : [null]
    });
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.form.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getUserByEmail(email : any){
    this.userService.getCurrentUserListCart().subscribe(
      res => {
        if(res.status  == 'ok'){
          console.log(res.data);
          this.form.patchValue( res.data);
        }
      }
    );
  }

  update(): void {
    if (this.form.valid) {
      this.userService.updateInfoUser(this.form.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.form.reset();
            this.message.create('success', res.info);
            this.router.navigate(['/admin/user']);
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
