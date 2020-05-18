import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogPlaylistsComponent } from './catalog-playlists.component';

describe('CatalogPlaylistsComponent', () => {
  let component: CatalogPlaylistsComponent;
  let fixture: ComponentFixture<CatalogPlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogPlaylistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
