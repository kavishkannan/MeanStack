import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDashboard } from './books-dashboard';

describe('BooksDashboard', () => {
  let component: BooksDashboard;
  let fixture: ComponentFixture<BooksDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
