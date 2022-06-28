import { TestBed } from '@angular/core/testing';

import { GuardCanactivateGuard } from './guard-canactivate.guard';

describe('GuardCanactivateGuard', () => {
  let guard: GuardCanactivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardCanactivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
