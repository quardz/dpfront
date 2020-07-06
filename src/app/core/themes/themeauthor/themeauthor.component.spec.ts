import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeauthorComponent } from './themeauthor.component';

describe('ThemeauthorComponent', () => {
  let component: ThemeauthorComponent;
  let fixture: ComponentFixture<ThemeauthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeauthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
