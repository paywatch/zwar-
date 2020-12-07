import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidanceviewComponent } from './residanceview.component';

describe('ResidanceviewComponent', () => {
  let component: ResidanceviewComponent;
  let fixture: ComponentFixture<ResidanceviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidanceviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidanceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
