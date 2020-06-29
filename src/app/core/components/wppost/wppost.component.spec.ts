import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WppostComponent } from './wppost.component';

describe('WppostComponent', () => {
  let component: WppostComponent;
  let fixture: ComponentFixture<WppostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WppostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WppostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
