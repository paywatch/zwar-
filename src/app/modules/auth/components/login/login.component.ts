import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    const paylaod = this.loginForm.value;
    this.authService.login(paylaod.email, paylaod.password).then(res => {
      this.router.navigate(['/profile']);
      this.toaster.success('تم تسجيل الدخول');
    }).catch(err => {
      this.toaster.error(err);
    });
  }


  googleLogin() {
    this.authService.doGoogleLogin().then(res => {
      this.router.navigate(['/profile']);
    });
  }
}
