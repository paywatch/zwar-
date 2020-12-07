import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportaionComponent } from './transportaion.component';

describe('TransportaionComponent', () => {
  let component: TransportaionComponent;
  let fixture: ComponentFixture<TransportaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
