import { TestBed } from '@angular/core/testing';

import { NarikFirebaseService } from './narik-firebase.service';

describe('NarikFirebaseService', () => {
  let service: NarikFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarikFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
