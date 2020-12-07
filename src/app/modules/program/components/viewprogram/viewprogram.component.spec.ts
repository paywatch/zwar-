import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewprogramComponent } from './viewprogram.component';

describe('ViewprogramComponent', () => {
  let component: ViewprogramComponent;
  let fixture: ComponentFixture<ViewprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
