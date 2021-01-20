import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyCategoryComponent } from './agency-category.component';

describe('AgencyCategoryComponent', () => {
  let component: AgencyCategoryComponent;
  let fixture: ComponentFixture<AgencyCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
