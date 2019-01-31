import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameResultsPage } from './game-results.page';

describe('GameResultsPage', () => {
  let component: GameResultsPage;
  let fixture: ComponentFixture<GameResultsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameResultsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
