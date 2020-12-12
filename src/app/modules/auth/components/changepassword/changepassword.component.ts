import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../../_helpers/must-match.validator';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  submit() {
    const payload = this.changePasswordForm.value;
    this.authService.changePassword(payload.confirmPassword).then(() => {
      this.toaster.success('تم تغيير كلمه المرور بنجاح');
      this.router.navigate(['/auth/login']);
    }).catch(err => this.toaster.error(err));
  }

}
