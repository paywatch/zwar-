import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// FIRESTORE IMPORT;
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ProfileService } from '../../services/profile/profile.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: any;
  modalRef: BsModalRef;
  uploads: any[];
  allPercentage: any;
  userImageId: any;
  sub: Subscription;
  singleUser: any[];

  constructor(
    private modalService: BsModalService,
    private db: AngularFireStorage,
    private afs: AngularFirestore,
    private profileService: ProfileService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.getSpecifiedUser();
    this.getDataFromSessionStorage();
    this.getusersImageCollection();
  }

  getDataFromSessionStorage() {
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    this.userImageId = JSON.parse(localStorage.getItem('userFile')) || [];
  }

  getSpecifiedUser() {
    this.sub = this.profileService.getSingleUsers().subscribe(users => {
      this.singleUser = users.filter(user => user.Email == this.user.user.email);
      this.user.data = this.singleUser;
    });
  }

  getusersImageCollection() {
    this.sub = this.profileService.getUserImage().subscribe(files => {
      const userSet = new Set(this.userImageId);
      const find = files.filter(file => userSet.has(file.id));
      this.user.userImage = find;
    });
  }

  deleteUserImage(item) {
    const path = `userFile/${item.name}`;
    const ref = this.db.ref(path);
    ref.delete();
    this.profileService.deleteUSerImage(item);
    this.toast.success('تم الحذف');
    this.user.userImage = this.user.userImage.filter(image => image.id !== item.id);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  userChange(event) {
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `userFile/${file.name}`;
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

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('userFile').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            let files = JSON.parse(localStorage.getItem('userFile'));
            files = files ? files : [];
            files.push(res.id);
            localStorage.setItem('userFile', JSON.stringify(files));
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
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
