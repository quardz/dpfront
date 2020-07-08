import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpoutletComponent } from './wpoutlet.component';

describe('WpoutletComponent', () => {
  let component: WpoutletComponent;
  let fixture: ComponentFixture<WpoutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpoutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
