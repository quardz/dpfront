import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentytwelveComponent } from './twentytwelve.component';

describe('TwentytwelveComponent', () => {
  let component: TwentytwelveComponent;
  let fixture: ComponentFixture<TwentytwelveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwentytwelveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwentytwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
