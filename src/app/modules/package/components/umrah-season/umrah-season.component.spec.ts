import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmrahSeasonComponent } from './umrah-season.component';

describe('UmrahSeasonComponent', () => {
  let component: UmrahSeasonComponent;
  let fixture: ComponentFixture<UmrahSeasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmrahSeasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmrahSeasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
