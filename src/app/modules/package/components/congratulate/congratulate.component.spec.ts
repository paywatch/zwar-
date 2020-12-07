import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratulateComponent } from './congratulate.component';

describe('CongratulateComponent', () => {
  let component: CongratulateComponent;
  let fixture: ComponentFixture<CongratulateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratulateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
