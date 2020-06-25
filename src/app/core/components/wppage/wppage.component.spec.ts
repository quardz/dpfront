import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WppageComponent } from './wppage.component';

describe('WppageComponent', () => {
  let component: WppageComponent;
  let fixture: ComponentFixture<WppageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WppageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WppageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
