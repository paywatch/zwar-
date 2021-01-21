import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramService } from '../../services/program.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  user: any;
  basics: any;
  residential: any;
  transportation: any;
  visit: any;
  residance: any;
  program: any;
  modalRef: BsModalRef;
  selectedMeccaFile: any;
  selectedMadinaFile: any;
  programbanner: any;


  constructor(
    private router: Router,
    private programService: ProgramService,
    private modalService: BsModalService,
  ) { }

  ngOnInit(): void {
    this.collectAllData();
    this.getAllCategory();
    this.getAllHotelStars();
    this.getAllAirplanes();
    this.getAllTransportation();
    this.getProgramBanner();
    this.getMeccaBanner();
    this.getMadinaBanner();
  }

  collectAllData() {
    this.basics = JSON.parse(sessionStorage.getItem('basics'));
    this.residential = JSON.parse(sessionStorage.getItem('hotels'));
    this.transportation = JSON.parse(sessionStorage.getItem('residence'));
    this.visit = JSON.parse(sessionStorage.getItem('visit'));
    this.selectedMeccaFile = JSON.parse(sessionStorage.getItem('MeccaImageID')) || [];
    this.selectedMadinaFile = JSON.parse(sessionStorage.getItem('MadinaImageID')) || [];
    this.programbanner = JSON.parse(sessionStorage.getItem('programBannerID')) || [];
    this.user = JSON.parse(localStorage.getItem('user')) || {};
    this.program = {
      ...this.basics,
      ...this.residential,
      ...this.transportation,
      ...this.visit
    };
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      {
        class: 'modal-dialog-centered'
      });
  }

  getProgramBanner() {
    this.programService.getFileFromStorage().subscribe(files => {
      const programBannerSet = new Set(this.programbanner);
      this.program.programbanner = files.filter(file => programBannerSet.has(file.id));
    });
  }

  getMeccaBanner() {
    this.programService.getMeccaFileFromStorage().subscribe(files => {
      const meccaFiles = new Set(this.selectedMeccaFile);
      this.program.selectedMeccaFile = files.filter(file => meccaFiles.has(file.id));
    });
  }

  getMadinaBanner() {
    this.programService.getMadinaFileFromStorage().subscribe(files => {
      const madinaFiles = new Set(this.selectedMadinaFile);
      this.program.selectedMadinaFile = files.filter(file => madinaFiles.has(file.id));
    });
  }

  getAllCategory() {
    this.programService.getAllCategory().subscribe(categories => {
      const found = categories.find(c => c.id == this.basics.programCategoryID);
      this.program.categoryName = found.name;
    });
  }

  getAllHotelStars() {
    this.programService.getAllStars().subscribe(stars => {
      const found = stars.find(star => star.id == this.residential.hotelStars);
      const madinaHotel = stars.find(star => star.id == this.residential.MHotelStars);
      if (this.program.MHotelStars) {
        this.program.madianHotelStar = madinaHotel.name;
      }
      if (this.program.hotelStars) {
        this.program.hotelStar = found.name;
      }
    });
  }

  getAllAirplanes() {
    this.programService.getAllAirplaneCompany().subscribe(airplane => {
      this.program.airlineNAme = airplane.find(air => air.id == this.transportation.airlineID).name;
    });
  }

  getAllTransportation() {
    this.programService.getAllTransportation().subscribe(transportation => {
      this.program.transportName = transportation.find(t => t.id == this.transportation.internalTransportations).name;
    });
  }

  confirm() {
    console.log(this.user);
    this.program.uid = this.user.user.uid;
    console.log(this.program.uid);
    this.programService.AddProgram(this.program).subscribe(program => {
      sessionStorage.removeItem('basics');
      sessionStorage.removeItem('hotels');
      sessionStorage.removeItem('residence');
      sessionStorage.removeItem('visit');
      sessionStorage.removeItem('basicID');
      sessionStorage.removeItem('visitID');
      sessionStorage.removeItem('residenceID');
      sessionStorage.removeItem('hotelID');
      sessionStorage.removeItem('programBannerID');
      sessionStorage.removeItem('MadinaImageID');
      sessionStorage.removeItem('MeccaImageID');
      sessionStorage.setItem('program', JSON.stringify(this.program));
      this.router.navigate(['program/congratulation']);
    });
  }

  back() {
    this.router.navigate(['/program/visits']);
  }

}
