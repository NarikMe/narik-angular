import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarikFirebaseComponent } from './narik-firebase.component';

describe('NarikFirebaseComponent', () => {
  let component: NarikFirebaseComponent;
  let fixture: ComponentFixture<NarikFirebaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarikFirebaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NarikFirebaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
