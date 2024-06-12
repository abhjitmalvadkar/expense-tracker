import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";
import * as moment from "moment";

@Pipe({
  name: 'datetimeFormat'
})
@Injectable({
  providedIn: "root"
})
export class DatetimeFormatPipe implements PipeTransform {
  constructor(public datePipe: DatePipe) {
  }

  transform(value, isInput = false): any {
    if (!value) {
      return "";
    }
    if (isInput) {
      const cleanValue = this.cleanDate(value);

      let month: any = cleanValue.substr(0, 2);
      let day: any = cleanValue.substr(2, 2);
      let year: any = cleanValue.substr(4, 4);
      let hour: any = cleanValue.substr(8, 2);
      let minutes: any = cleanValue.substr(10, 2);
      const a: any = cleanValue.substr(12, 2);

      let formattedValue = cleanValue;

      if (month) {
        if (parseInt(month, 10) > 12) {
          month = 12;
        }

        formattedValue = `${month}`;

        if (month.length === 2) {
          formattedValue += "/";
        }
      }

      if (day) {
        if (parseInt(day, 10) > 31) {
          day = 31;
        }

        formattedValue = `${month}/${day}`;

        if (day.length === 2) {
          formattedValue += "/";
        }
      }

      if (year) {
        if (year.length === 4) {
          if (parseInt(year, 10) < 1900) {
            year = "1900";
          }

          if (parseInt(year, 10) > 2200) {
            year = "2200";
          }
          const daysInMonth = moment(`${month + "-" + year}`, "MM-YYYY").daysInMonth();

          if (day > daysInMonth) {
            day = daysInMonth;
          }
        }

        formattedValue = `${month}/${day}/${year}`;

        if (year.length === 4) {
          formattedValue += ", ";
        }
      }

      if (hour) {
        if (parseInt(hour, 10) > 12) {
          hour = "12";
        }

        formattedValue = `${month}/${day}/${year}, ${hour}`;

        if (hour.length === 2) {
          formattedValue += ":";
        }
      }

      if (minutes) {
        if (parseInt(minutes, 10) > 59) {
          minutes = "59";
        }

        formattedValue = `${month}/${day}/${year}, ${hour}:${minutes}`;
      }

      if (a) {
        formattedValue = `${month}/${day}/${year}, ${hour}:${minutes} ${a}`;
      }

      return formattedValue;
    }

    return this.datePipe.transform(value, "MM/dd/yyyy, hh:mm a");
  }

  cleanDate(value) {
    if (value && value.match(/\d/g) && value.match(/\d/g).length) {
      let cleanedValue = value.match(/\d/g).join("");

      if (value.length >= 17) {
        if (value.includes("a") || value.includes("A")) {
          cleanedValue += "AM";
        }

        if (value.includes("p") || value.includes("P")) {
          cleanedValue += "PM";
        }
      }

      return cleanedValue;
    }

    return "";
  }
}
