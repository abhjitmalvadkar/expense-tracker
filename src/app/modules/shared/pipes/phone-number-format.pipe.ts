import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phoneNumberFormat'
})
export class PhoneNumberFormatPipe implements PipeTransform {

  transform(value): any {
    const tempValue = value && value.replace(/\D/g, '-').split('-') || [];
    if (tempValue[0] === '') {
      tempValue.shift();
    }

    if (tempValue.length === 3) {
      if (tempValue[0].length > 3 || tempValue[1].length > 3) {
        return this.formatPhoneNumber(value);
      }

      if (tempValue[0].length === 3 || tempValue[1].length === 3) {
        return `(${tempValue[0]})${tempValue[1]}-${tempValue[2]}`;
      }

      if (tempValue[0].length < 3 || tempValue[1].length < 3 || tempValue[2].length < 4) {
        return value;
      }
    }

    return this.formatPhoneNumber(value);
  }

  cleanPhoneNumber(value) {
    if (value && value.match(/\d/g) && value.match(/\d/g).length) {
      return value.match(/\d/g).join('');
    }

    return '';
  }

  formatPhoneNumber(value) {
    const cleanValue = this.cleanPhoneNumber(value);

    const part1: any = cleanValue.substr(0, 3);
    const part2: any = cleanValue.substr(3, 3);
    const part3: any = cleanValue.substr(6, 4);

    let formattedValue = cleanValue;

    if (part1) {
      formattedValue = `${part1}`;
    }

    if (part2) {
      formattedValue = `(${part1})${part2}`;
    }

    if (part3) {
      formattedValue = `(${part1})${part2}-${part3}`;
    }

    return formattedValue;
  }
}
