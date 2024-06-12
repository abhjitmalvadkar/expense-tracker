import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseListTableComponent } from './expense-list-table.component';

describe('ExpenseListTableComponent', () => {
  let component: ExpenseListTableComponent;
  let fixture: ComponentFixture<ExpenseListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseListTableComponent]
    });
    fixture = TestBed.createComponent(ExpenseListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
