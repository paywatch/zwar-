import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-hotel-stars',
  templateUrl: './hotel-stars.component.html',
  styleUrls: ['./hotel-stars.component.css']
})
export class HotelStarsComponent implements OnInit {

  programHotelStar: FormGroup;
  sub: Subscription;
  hotelStars: any;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getStars();
  }

  getStars() {
    this.sub = this.programService.getAllStars().subscribe(res => {
      this.hotelStars = res;
      console.log(res);
    });
  }

  initForm() {
    this.programHotelStar = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[\u0621-\u064Aa-zA-Z\s]+$/)]]
    });
  }

  AddHotelStar() {
    const payload = this.programHotelStar.value;
    this.programService.AddHotelStar(payload);
  }

  deleteItem(item) {
    this.programService.deleteHotelStar(item);
  }

}
