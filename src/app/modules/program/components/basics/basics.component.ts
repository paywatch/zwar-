import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';


import { ProgramService } from '../../services/program.service';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit {

  basicsForm: FormGroup;
  // categories$: Observable<any[]>;
  // paths$: Observable<any[]>;
  basics: any;
  categories: any[];
  programs: any;
  selectedBasic: any;
  Basics$: any[];
  basicID: any;
  feasturedStream: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private programService: ProgramService,
    private db: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.patchForm();
    setTimeout(() => {
      this.getBasicData();
    }, 1000);
    this.getAllCategory();
    this.initForm();
  }

  initForm() {
    this.basicsForm = this.fb.group({
      programName: ['', [Validators.required, Validators.maxLength(100)]],
      programPathID: ['', Validators.required],
      programUmrahYear: ['', [Validators.required, Validators.maxLength(4), Validators.pattern(/^[0-9]*$/)]],
      programCategoryID: ['', Validators.required],
      programPrice: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      programDesc: ['', [Validators.required, Validators.maxLength(1000)]],
    });
  }

  patchForm() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    this.basicID = JSON.parse(sessionStorage.getItem('basicID'));
  }

  programBanner(event: any) {
    const file = event.target.files[0];
    const filePath = '/photos/url';
    const ref = this.db.ref(filePath);
    const task = ref.put(file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = ref.getDownloadURL())
    ).subscribe();
  }

  getBasicData() {
    this.programService.getProgramBasics().subscribe(basics => {
      this.Basics$ = basics;
      if (this.basics) {
        this.selectedBasic = basics.find(b => b.id == this.basicID);
        console.log(this.selectedBasic);
        this.basicsForm.patchValue(this.selectedBasic);
      }
    });
  }


  getAllCategory() {
    this.programService.getAllCategory().subscribe(category => {
      this.categories = category;
      console.log(category);
    });
  }

  createProgram() {
    const payload = this.basicsForm.value;
    this.programService.createProgram(payload)
      .subscribe(
        (data) => {
          this.toastr.success('تمت الاضافه بنجاح');
          this.router.navigate(['/program/residential']);
        }
      );
  }

  updateBasic() {
    const id = this.selectedBasic.id;
    console.log(id);
    this.selectedBasic = this.basicsForm.value;
    this.selectedBasic.id = id;
    console.log(this.selectedBasic);
    this.programService.updateBasicData(this.selectedBasic);
    this.router.navigate(['/program/residential']);
    this.toastr.success('تم التعديل');
  }

  deleteBasic() {
    this.programService.deleteBasic(this.selectedBasic);
  }

}
