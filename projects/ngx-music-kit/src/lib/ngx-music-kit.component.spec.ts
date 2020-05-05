import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMusicKitComponent } from './ngx-music-kit.component';

describe('NgxMusicKitComponent', () => {
  let component: NgxMusicKitComponent;
  let fixture: ComponentFixture<NgxMusicKitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMusicKitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMusicKitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
