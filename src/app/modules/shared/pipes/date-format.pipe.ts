import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  constructor(public datePipe: DatePipe) {
  }

  transform(value: string | number | Date, isInput = false): any {
    if (!value) {
      return '';
    }

    if (isInput) {
      const cleanValue = this.cleanDate(value);

      let month: any = cleanValue.substr(0, 2);
      let day: any = cleanValue.substr(2, 2);
      let year: any = cleanValue.substr(4, 4);

      let formattedValue = cleanValue;

      if (month) {
        if (parseInt(month, 10) > 12) {
          month = '12';
        }

        formattedValue = `${month}`;

        if (month.length === 2) {
          formattedValue += '/';
        }
      }

      if (day) {
        if (parseInt(day, 10) > 31) {
          day = 31;
        }

        formattedValue = `${month}/${day}`;

        if (day.length === 2) {
          formattedValue += '/';
        }
      }

      if (year) {
        if (year.length === 4) {
          if (parseInt(year, 10) < 1900) {
            year = 1900;
          }

          if (parseInt(year, 10) > 2200) {
            year = 2200;
          }
          const daysInMonth = moment(`${month + '-' + year}`, 'MM-YYYY').daysInMonth();

          if (day > daysInMonth) {
            day = daysInMonth;
          }
        }

        formattedValue = `${month}/${day}/${year}`;
      }

      return formattedValue;
    }

    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // return this.datepipe.transform(value, 'MM/dd/yyyy', timeZone);
    return this.datePipe.transform(value, 'MM/dd/yyyy');
  }

  cleanDate(value: any) {
    if (value && value.match(/\d/g) && value?.match(/\d/g).length) {
      return value?.match(/\d/g).join('');
    }

    return '';
  }
}
