import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmrahDirectionComponent } from './umrah-direction.component';

describe('UmrahDirectionComponent', () => {
  let component: UmrahDirectionComponent;
  let fixture: ComponentFixture<UmrahDirectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmrahDirectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmrahDirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
