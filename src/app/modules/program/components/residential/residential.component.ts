import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { ProgramService } from '../../services/program.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-residential',
  templateUrl: './residential.component.html',
  styleUrls: ['./residential.component.css']
})
export class ResidentialComponent implements OnInit {

  modalRef: BsModalRef;
  basics: any;
  residentailForm: FormGroup;
  madinaForm: FormGroup;
  hideMadinaData: boolean;
  residential: any;
  hotelStars: any;
  selecetdHotel: any;
  hotelsData: any[];
  hotelID: any;
  uploads: any;
  allPercentage: any;
  files: Observable<any>;
  MeccaImageID: any;
  selectedMeccaFile: any;
  Madinauploads: any[];
  Madinafiles: Observable<any[]>;
  MadinaImageID: any;
  selectedMadinaFile: any;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private programservice: ProgramService,
    private toaster: ToastrService,
    private afs: AngularFirestore,
    private db: AngularFireStorage,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.initResidentialForm();
    this.getBasicsData();
    this.initMadinaResidence();
    this.patchFormValue();
    this.getAllHotelStars();
    this.getAllProgramHotel();
    setTimeout(() => {
      this.getAllProgramHotel();
      this.getSpecifieImage();
      this.getMadinaSpecifieImage();
    }, 1000);
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }


  getBasicsData() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
  }

  patchFormValue() {
    this.residential = JSON.parse(sessionStorage.getItem('hotels'));
    this.hotelID = JSON.parse(sessionStorage.getItem('hotelID'));
    this.MeccaImageID = JSON.parse(sessionStorage.getItem('MeccaImageID')) || {};
    this.MadinaImageID = JSON.parse(sessionStorage.getItem('MadinaImageID')) || {};
  }


  getSpecifieImage() {
    this.programservice.getMeccaFileFromStorage().subscribe(res => {
      this.MeccaImageID = this.MeccaImageID.map(m => res.find(r => r.id == m));
      this.selectedMeccaFile = this.MeccaImageID;
      console.log(this.selectedMeccaFile);
    });
  }

  uploadMeccaImage(event: any) {

    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `MeccaFiles/${file.name}`;
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
          return this.afs.collection('MeccaFiles').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            let files = JSON.parse(sessionStorage.getItem('MeccaImageID'));
            files = files ? files : [];
            files.push(res.id);
            sessionStorage.setItem('MeccaImageID', JSON.stringify(files));
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


  getMadinaSpecifieImage() {
    this.programservice.getMadinaFileFromStorage().subscribe(res => {
      this.MadinaImageID = this.MadinaImageID.map(m => res.find(r => r.id == m));
      this.selectedMadinaFile = this.MadinaImageID;
      console.log(this.selectedMeccaFile);
    });
  }

  uploadMAdinaImage(event) {

    this.Madinauploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];

    for (const file of filelist) {

      const path = `MaddinaFiles/${file.name}`;
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
      this.Madinauploads.push(uploadTrack);
      console.log(this.Madinauploads);

      // for every upload do whatever you want in firestore with the uploaded file
      const t = task.then((f) => {
        return f.ref.getDownloadURL().then((url) => {
          return this.afs.collection('MaddinaFiles').add({
            name: f.metadata.name,
            // tslint:disable-next-line:object-literal-shorthand
            url: url
          }).then(res => {
            let files = JSON.parse(sessionStorage.getItem('MadinaImageID'));
            files = files ? files : [];
            files.push(res.id);
            sessionStorage.setItem('MadinaImageID', JSON.stringify(files));
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

  get hotel() {
    const hotel = this.residentailForm;
    return hotel;
  }

  get hotels() {
    const Mhotel = this.madinaForm;
    return Mhotel;
  }

  initResidentialForm() {
    this.residentailForm = this.formBuilder.group({
      hotelName: ['', [Validators.required, Validators.maxLength(50)]],
      hotelNights: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      hotelStars: ['', Validators.required],
      distanceFromHaram: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      breakfastAvailable: [false],
      dinnerAvailable: [false],
      lunchAvailable: [false],
      breakfastIncluded: [true],
      lunchIncluded: [true],
      dinnerIncluded: [true],
      breakfastDetails: ['', Validators.maxLength(50)],
      breakfastPrice: ['', Validators.pattern(/^[0-9]*$/)],
      lunchDetails: ['', Validators.maxLength(50)],
      lunchPrice: ['', Validators.pattern(/^[0-9]*$/)],
      dinnerDetails: ['', Validators.maxLength(50)],
      dinnerPrice: ['', Validators.pattern(/^[0-9]*$/)],
    });
  }

  initMadinaResidence() {
    this.madinaForm = this.formBuilder.group({
      MHotelName: ['', [Validators.required, Validators.maxLength(50)]],
      MHotelNights: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      MHotelStars: ['', Validators.required],
      MDistanceFromHaram: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[0-9]*$/)]],
      MBreakfastAvailable: [false],
      MLunchAvailable: [false],
      MDinnerAvailable: [false],
      MBreakfastIncluded: [true],
      MLunchIncluded: [true],
      MDinnerIncluded: [true],
      MBreakfastDetails: ['', Validators.maxLength(50)],
      MBreakfastPrice: ['', Validators.pattern(/^[0-9]*$/)],
      MLunchDetails: ['', Validators.maxLength(50)],
      MLunchPrice: ['', Validators.pattern(/^[0-9]*$/)],
      MDinnerDetails: ['', Validators.maxLength(50)],
      MDinnerPrice: ['', Validators.pattern(/^[0-9]*$/)],
    });
  }

  getAllHotelStars() {
    this.programservice.getAllStars().subscribe(stars => {
      this.hotelStars = stars;
      console.log(this.hotelStars);
    });
  }

  getAllProgramHotel() {
    this.programservice.getProgramHotel().subscribe(hotel => {
      this.hotelsData = hotel;
      if (this.residential) {
        this.selecetdHotel = this.hotelsData.find(h => h.id == this.hotelID);
        console.log(this.selecetdHotel);
        this.residentailForm.patchValue(this.selecetdHotel);
        this.madinaForm.patchValue(this.selecetdHotel);
      }
    });
  }

  createHotels() {
    const hotels = { ...this.residentailForm.value, ...this.madinaForm.value };
    this.programservice.createResidential(hotels)
      .subscribe((res) => {
        this.router.navigate(['/program/transportation']);
        this.toaster.success('تمت الاضافه');
      });
  }

  updateHotels() {
    const id = this.selecetdHotel.id;
    const hotels = { ...this.residentailForm.value, ...this.madinaForm.value };
    this.selecetdHotel = hotels;
    this.selecetdHotel.id = id;
    if (this.selectedMeccaFile) {
      this.selecetdHotel.selectedMeccaFile = this.selectedMeccaFile;
    }
    if (this.selectedMadinaFile) {
      this.selecetdHotel.selectedMadinaFile = this.selectedMadinaFile;
    }
    this.programservice.updateProgramHotel(this.selecetdHotel);
    this.router.navigate(['/program/transportation']);
    this.toaster.success('تم التعديل');
  }

  deleteResidential() {
    this.programservice.deleteResidential(this.selecetdHotel);
    this.toaster.success('تم الحذف');
  }
}
