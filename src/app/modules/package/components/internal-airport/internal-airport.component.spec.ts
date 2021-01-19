import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalAirportComponent } from './internal-airport.component';

describe('InternalAirportComponent', () => {
  let component: InternalAirportComponent;
  let fixture: ComponentFixture<InternalAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalAirportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
