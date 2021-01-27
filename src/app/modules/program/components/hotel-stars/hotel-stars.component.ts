import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../services/program.service';

@Component({
  selector: 'app-hotel-stars',
  templateUrl: './hotel-stars.component.html',
  styleUrls: ['./hotel-stars.component.css']
})
export class HotelStarsComponent implements OnInit, OnDestroy {

  programHotelStar: FormGroup;
  sub: Subscription;
  hotelStars: any;
  itemToEdit: any;
  editState: boolean;
  page;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgramService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.editState = false;
    this.initForm();
    this.getStars();
  }

  initForm() {
    this.programHotelStar = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  getStars() {
    this.sub = this.programService.getAllStars().subscribe(res => {
      this.hotelStars = res;
      console.log(res);
    });
  }

  AddHotelStar() {
    const payload = this.programHotelStar.value;
    if (this.programHotelStar.valid) {
      const result = this.hotelStars.find(hotel => hotel.name == payload.name);
      if (!result) {
        this.programService.AddHotelStar(payload);
        this.toast.success('تمت الاضافه');
        this.programHotelStar.reset();
      }
      else {
        this.toast.error('موجود من قبل');
      }
    }
  }

  updateItem(item) {
    this.itemToEdit = item;
    this.editState = true;
  }

  updateSingleItem(item) {
    this.programService.updateHotelStar(item);
    this.editState = false;
    this.toast.success('تم التعديل');
  }

  deleteItem(item) {
    this.programService.deleteHotelStar(item);
    this.toast.error('تم الحذف');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
