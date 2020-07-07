import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpwidgetsComponent } from './wpwidgets.component';

describe('WpwidgetsComponent', () => {
  let component: WpwidgetsComponent;
  let fixture: ComponentFixture<WpwidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpwidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpwidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
