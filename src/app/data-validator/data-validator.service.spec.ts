/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataValidatorService } from './data-validator.service';

describe('Service: DataValidator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataValidatorService]
    });
  });

  it('should ...', inject([DataValidatorService], (service: DataValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
