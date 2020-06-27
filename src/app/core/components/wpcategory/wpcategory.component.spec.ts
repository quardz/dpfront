import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpcategoryComponent } from './wpcategory.component';

describe('WpcategoryComponent', () => {
  let component: WpcategoryComponent;
  let fixture: ComponentFixture<WpcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
