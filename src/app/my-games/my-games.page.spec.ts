import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesPage } from './my-games.page';

describe('MyGamesPage', () => {
  let component: MyGamesPage;
  let fixture: ComponentFixture<MyGamesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyGamesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyGamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
