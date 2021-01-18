import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneCompanyComponent } from './airplane-company.component';

describe('AirplaneCompanyComponent', () => {
  let component: AirplaneCompanyComponent;
  let fixture: ComponentFixture<AirplaneCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirplaneCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirplaneCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
