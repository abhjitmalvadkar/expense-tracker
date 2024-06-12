import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseScreenComponent } from './expense-screen.component';

describe('ExpenseScreenComponent', () => {
  let component: ExpenseScreenComponent;
  let fixture: ComponentFixture<ExpenseScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseScreenComponent]
    });
    fixture = TestBed.createComponent(ExpenseScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
