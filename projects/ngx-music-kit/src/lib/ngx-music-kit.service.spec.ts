import { TestBed } from '@angular/core/testing';

import { NgxMusicKitService } from './ngx-music-kit.service';

describe('NgxMusicKitService', () => {
  let service: NgxMusicKitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMusicKitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
