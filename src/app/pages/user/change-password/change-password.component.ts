import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.userService.changePassword(this.validateForm.value).subscribe(
        res => {
          if(res.status == 'ok'){
            this.message.create('success', 'Change Password Success!');
          }
        }
      );
      console.log('submit', this.validateForm.value);

    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  constructor(private fb: FormBuilder,
    private userService : UserService,
    private message: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      verification_code: [null, [Validators.required]],
    });
  }

  getCode(event : any){
    let email = this.validateForm.get('email')?.value;
    if(email != null){
      this.userService.sendMail(email).subscribe(
        (res : any )=> {
            console.log("pushing mail");
          if(res.status == 'ok'){
            this.message.create('success', 'Gửi email thành công. Vui lòng kiểm tra email');
          }
        }
      );
    }
  }

}
