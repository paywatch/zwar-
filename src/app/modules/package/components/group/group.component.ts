import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckPhoneNumber } from '../../../../_helpers/checkNumber.validator';
import { maxSize } from 'src/app/_helpers/File.validator';

import { PackageService } from '../../services/package-service.service';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalService } from 'ngx-bootstrap/modal';


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
  GroupID: any;
  selectedGroup: any;
  uploads: any[];
  allPercentage: Observable<unknown>;
  files: Observable<any[]>;
  MatwafImageID: any;
  matwafImage: any;
  modalRef: any;

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private router: Router,
    private toast: ToastrService,
    private afs: AngularFirestore,
    private db: AngularFireStorage,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getProgramGroup();
    this.patchForm();
    setTimeout(() => {
      this.getProgramGroup();
      this.getFileFromStorage();
    }, 1000);
    this.loadBasicInfo();
    setTimeout(() => {
      this.getMatwafImage();
    }, 1000);
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
    this.GroupID = JSON.parse(sessionStorage.getItem('groupID')) || {};
    this.MatwafImageID = JSON.parse(sessionStorage.getItem('MatwafImage')) || {};
  }

  loadBasicInfo() {
    this.basics = JSON.parse(sessionStorage.getItem('ID'));
  }

  back() {
    this.router.navigate(['/package/base/', this.basics]);
  }

  getProgramGroup() {
    this.packageService.getMatwaf().subscribe(matwaf => {
      if (this.group) {
        this.selectedGroup = matwaf.find(m => m.id == this.GroupID);
        this.groupForm.patchValue(this.selectedGroup);
      }
    });
  }

  getFileFromStorage() {
    return this.files = this.afs.collection('MatwafImage').snapshotChanges().pipe(
      map(changes => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getMatwafImage() {
    this.getFileFromStorage().subscribe(image => {
      const find = image.find(i => i.id == this.MatwafImageID);
      this.matwafImage = find;
      console.log(this.matwafImage);
    });
  }

  matwafChange(event) {

    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `matwafFile/${file.name}`;
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
          return this.afs.collection('MatwafImage').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            sessionStorage.setItem('MatwafImage', JSON.stringify(res.id));
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

  updatePackageMatwaf() {
    this.selectedGroup = this.groupForm.value;
    this.selectedGroup.id = this.GroupID;
    // tslint:disable-next-line:no-unused-expression
    this.matwafImage ? this.selectedGroup.matwafImage = this.matwafImage : null;
    console.log(this.selectedGroup);
    this.packageService.updatePackageMatwaf(this.selectedGroup);
    this.router.navigate(['/package/room-data']);
    this.toast.success('تم التعديل');
  }

  deleteMatwaf() {
    this.packageService.deletePackageMatwaf(this.selectedGroup);
    this.toast.info('تم الحذف');
    this.groupForm.reset();
  }
}
