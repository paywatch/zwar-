import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';


import { ProgramService } from '../../services/program.service';
import { finalize, map, tap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';


@Component({
  selector: 'app-basics',
  templateUrl: './basics.component.html',
  styleUrls: ['./basics.component.css']
})
export class BasicsComponent implements OnInit {
  modalRef: BsModalRef;
  basicsForm: FormGroup;
  basics: any;
  categories: any[];
  programs: any;
  selectedBasic: any;
  Basics$: any[];
  basicID: any;
  feasturedStream: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  programUrl: string;

  uploads: any[];
  allPercentage: Observable<any>;
  files: Observable<any>;
  selectedProgramBannerFile: any;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private programService: ProgramService,
    private db: AngularFireStorage,
    private afs: AngularFirestore,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.patchForm();
    setTimeout(() => {
      this.getBasicData();
    }, 1000);
    this.getAllCategory();
    this.initForm();
    this.files = this.afs.collection('files').valueChanges();
    if (this.files) {
      this.files.subscribe(file => {
        this.selectedProgramBannerFile = file;
        console.log(this.selectedProgramBannerFile);
      });
    }
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
      class: 'modal-dialog-centered' });
  }

  programBanner(event: any) {

    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `files/${file.name}`;
      const ref = this.db.ref(path);
      const task = this.db.upload(path, file);
      // tslint:disable-next-line:variable-name
      const _percentage$ = task.percentageChanges();
      allPercentage.push(_percentage$);

      // create composed objects with different information. ADAPT THIS ACCORDING to YOUR NEED
      const uploadTrack = {
        fileName: file.name,
        percentage: _percentage$
      };

      // push each upload into the array
      this.uploads.push(uploadTrack);
      console.log(this.uploads);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('files').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          });
        });
      });

      this.allPercentage = combineLatest(allPercentage)
        .pipe(
          map((percentages) => {
            let result = 0;
            for (const percentage of percentages) {
              result = result + percentage;
            }
            return result / percentages.length;
          }),
          tap(console.log)
        );
    }
    // const file = event.target.files[0];
    // const filePath = '/photos/url';
    // const ref = this.db.ref(filePath);
    // const task = ref.put(file);

    // this.uploadPercent = task.percentageChanges();
    // task.snapshotChanges().pipe(
    //   finalize(() => this.downloadURL = ref.getDownloadURL())
    // ).subscribe();
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
    payload.programUrl = this.selectedProgramBannerFile;
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
    this.selectedBasic = this.basicsForm.value;
    this.selectedBasic.id = id;
    this.selectedBasic.programUrl = this.selectedProgramBannerFile;
    console.log(this.selectedBasic);
    this.programService.updateBasicData(this.selectedBasic);
    this.router.navigate(['/program/residential']);
    this.toastr.success('تم التعديل');
  }

  deleteBasic() {
    this.programService.deleteBasic(this.selectedBasic);
  }

}
