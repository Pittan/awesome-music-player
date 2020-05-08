import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CassetteTapeComponent } from './cassette-tape.component';

describe('CassetteTapeComponent', () => {
  let component: CassetteTapeComponent;
  let fixture: ComponentFixture<CassetteTapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CassetteTapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CassetteTapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
