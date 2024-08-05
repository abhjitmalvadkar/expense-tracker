import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {
  expenseList = [
    {
      id: 0,
      date: '2011-10-05T14:48:00.000Z',
      expense: 'Food',
      valueEnteredInCurrency: 1,
      amount: 650
    },
    {
      id: 1,
      date: '2011-10-05T14:48:00.000Z',
      expense: 'Petrol',
      valueEnteredInCurrency: 1,
      amount: 150
    },
    {
      id: 2,
      date: '2011-10-05T14:48:00.000Z',
      expense: 'Movie',
      valueEnteredInCurrency: 1,
      amount: 250
    },
    {
      id: 3,
      date: '2011-10-05T14:48:00.000Z',
      expense: 'Shopping',

      valueEnteredInCurrency: 1,
      amount: 1000
    }
  ]

  constructor() {
  }

  fetchExpenseList(payload: any): Observable<any> {
    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        list: this.expenseList
      }
    });
  }

  addNewExpense(payload: any): Observable<any> {
    this.expenseList = [
      ...this.expenseList,
      payload
    ]

    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        list: [...this.expenseList]
      }
    });
  }

  updateExpense(payload: any): Observable<any> {
    const index = this.expenseList.findIndex(i => i.id === payload.id);
    if (index !== -1) {
      this.expenseList = JSON.parse(JSON.stringify(this.expenseList));
      this.expenseList[index] = payload;
    }

    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        list: [
          ...this.expenseList
        ]
      }
    });
  }

  deleteExpense(payload: any): Observable<any> {
    this.expenseList = this.expenseList.filter(expense => expense.id !== payload.expenseId);

    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        list: [
          ...this.expenseList
        ]
      }
    });
  }

  fetchUsersList(): Observable<any> {
    return of({
      success: true,
      code: 'Dummy Code ABCD1234',
      message: 'Dummy Message',
      data: {
        list: [
          {
            key: 1,
            value: 'User 1'
          },
          {
            key: 2,
            value: 'User 2'
          },
          {
            key: 3,
            value: 'User 3'
          },
          {
            key: 4,
            value: 'User 4'
          },
          {
            key: 5,
            value: 'User 5'
          }
        ]
      }
    });
  }

}
