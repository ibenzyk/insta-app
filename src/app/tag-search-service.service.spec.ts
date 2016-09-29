/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TagSearchServiceService } from './tag-search-service.service';

describe('Service: TagSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TagSearchServiceService]
    });
  });

  it('should ...', inject([TagSearchServiceService], (service: TagSearchServiceService) => {
    expect(service).toBeTruthy();
  }));
});
