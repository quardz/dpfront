import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WpnavComponent } from './wpnav.component';

describe('WpnavComponent', () => {
  let component: WpnavComponent;
  let fixture: ComponentFixture<WpnavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WpnavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WpnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
