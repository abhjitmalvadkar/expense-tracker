import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListCardComponent } from './expense-list-card.component';

describe('ExpenseListCardComponent', () => {
  let component: ExpenseListCardComponent;
  let fixture: ComponentFixture<ExpenseListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseListCardComponent]
    });
    fixture = TestBed.createComponent(ExpenseListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
