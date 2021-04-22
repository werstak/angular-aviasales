import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadFilterComponent } from './head-filter.component';

describe('HeadFilterComponent', () => {
  let component: HeadFilterComponent;
  let fixture: ComponentFixture<HeadFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
