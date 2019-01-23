import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaPagePage } from './trivia-page.page';

describe('TriviaPagePage', () => {
  let component: TriviaPagePage;
  let fixture: ComponentFixture<TriviaPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriviaPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriviaPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
