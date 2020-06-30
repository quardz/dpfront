import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpsearchboxComponent } from './wpsearchbox.component';

describe('WpsearchboxComponent', () => {
  let component: WpsearchboxComponent;
  let fixture: ComponentFixture<WpsearchboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpsearchboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpsearchboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
