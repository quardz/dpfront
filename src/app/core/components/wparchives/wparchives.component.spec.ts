import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WparchivesComponent } from './wparchives.component';

describe('WparchivesComponent', () => {
  let component: WparchivesComponent;
  let fixture: ComponentFixture<WparchivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WparchivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WparchivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
