import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from '../../models/package';
import { PackageService } from '../../services/package-service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  singlePackage: Package;
  packageForm: FormGroup;
  ID: any;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private packageService: PackageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ID = this.activatedRouter.snapshot.params['id'];
    this.initForm();
    this.getPackage(this.ID);
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      ID: [this.singlePackage?.ID],
      groupLeadName: [this.singlePackage?.groupLeadName],
      groupLeadPhone: [this.singlePackage?.groupLeadPhone],
      itineraryID: [this.singlePackage?.itineraryID],
      localAirportID: [this.singlePackage?.localAirportID],
      mutawefName: [this.singlePackage?.mutawefName],
      mutawefPhone: [this.singlePackage?.mutawefPhone],
      mutawefPicture: [this.singlePackage?.mutawefPicture],
      packageAvailableSeats: [this.singlePackage?.packageAvailableSeats],
      packageCapacity: [this.singlePackage?.packageCapacity],
      packageDepartureDate: [this.singlePackage?.packageReturnDate],
      packageReturnDate: [this.singlePackage?.packageDepartureDate],
      packageSeasonID: [this.singlePackage?.packageSeasonID],
      roomPriceAdult: [this.singlePackage?.roomPriceAdult],
      roomPriceKids: [this.singlePackage?.roomPriceKids],
      roomQuantity: [this.singlePackage?.roomQuantity],
      roomTypeID: [this.singlePackage?.roomTypeID],
      roomTypeInfants: [this.singlePackage?.roomTypeInfants]
    });
  }

  getPackage(id) {
    this.packageService.getPackage().subscribe(packages => {
      const found = packages.find(p => p.id == id);
      this.singlePackage = found;
      console.log(this.singlePackage);
      this.packageForm.patchValue(this.singlePackage);
    });
  }

  submit() {
    this.singlePackage = this.packageForm.value;
    this.singlePackage.id = this.ID;
    console.log(this.singlePackage);
    this.packageService.updatePackage(this.singlePackage);
    this.router.navigate(['package/edit']);
  }
}
