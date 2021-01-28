import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/modules/profile/services/profile/profile.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  sub: Subscription;
  users: any[];

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.initForm();
    this.getUsers();
  }

  initForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      displayName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  getUsers() {
    this.sub = this.profileService.getSingleUsers().subscribe(user => {
      this.users = user;
      console.log(user);
    });
  }

  submit() {
    const payload = this.registerForm.value;
    const result = this.users.find(user => user.Email == payload.email);
    if (!result) {
      this.authService.register(payload.email, payload.password, payload.phoneNumber, payload.displayName)
        .then(res => {
          this.toast.success('تم التسجيل بنجاح');
          this.router.navigate(['/auth/login']);
        }).catch(err => {
          this.toast.error(err);
        });
    }
    else {
      this.toast.error('هذا البريد الالكتروني موجود من قبل');
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
