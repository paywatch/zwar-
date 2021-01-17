import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelStarsComponent } from './hotel-stars.component';

describe('HotelStarsComponent', () => {
  let component: HotelStarsComponent;
  let fixture: ComponentFixture<HotelStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
