import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckPhoneNumber } from '../../../../_helpers/checkNumber.validator';
import { maxSize } from 'src/app/_helpers/File.validator';

import { UtilsService } from '../../../core/services/utils/utils.service';
import { PackageService } from '../../services/package-service.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  basics: any;
  group: any;
  groupForm: FormGroup;
  matwafUrl: string;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private router: Router,
    private utilsService: UtilsService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
    setTimeout(() => {
      this.patchForm();
    }, 1000);
    this.loadBasicInfo();
  }

  initForm() {
    this.groupForm = this.fb.group({
      mutawefName: ['', [Validators.required, Validators.maxLength(50)]],
      mutawefPhone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]+/)]],
      groupLeadName: ['', [Validators.required, Validators.maxLength(50)]],
      groupLeadPhone: ['', [Validators.required,
        Validators.maxLength(20),
        Validators.pattern(/^[0-9]+/)]],
      mutawefPicture: [maxSize(500)],
    }, {
      validators: CheckPhoneNumber('mutawefPhone', 'groupLeadPhone')
    });
  }

  patchForm() {
    this.group = JSON.parse(sessionStorage.getItem('group'));
    this.group ? this.groupForm.patchValue(this.group) : {};
  }

  loadBasicInfo() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    console.log(this.basics);
  }

  back() {
    this.router.navigate(['/package/base/', this.basics.programId]);
  }

  createGroup() {
    const payload = this.groupForm.value;
    this.packageService.createGroup(payload)
      .subscribe((res) => {
        if (res) {
          this.toast.success('تمت الاضافه');
          this.router.navigate(['/package/room-data']);
        }
      },
        (err) => {
          this.toast.error('لقد حدث خطأ ما');
        });
  }
}
