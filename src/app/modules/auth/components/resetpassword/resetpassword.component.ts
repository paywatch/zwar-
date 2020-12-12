import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  ResetPAsswordForm: FormGroup;

  constructor(
    private router: Router,
    private activatedActivated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.inittForm();
    const mode = this.activatedActivated.snapshot.queryParams['mode'];
    console.log(mode);
  }

  inittForm() {
    this.ResetPAsswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    const payload = this.ResetPAsswordForm.value;
    console.log(payload);

    if (!payload) {
      this.toaster.info('ادخل البريد الالكتروني')
    }
    else {
      this.authService.resetPassword(payload.email).then(() => {
        this.router.navigate(['/auth/login']);
        this.toaster.success('تم تغيير كلمه المرور');
      }).catch((err) => this.toaster.error(err));
    }
  }

}
