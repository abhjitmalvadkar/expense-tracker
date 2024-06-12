import {Directive, ElementRef, HostListener} from '@angular/core';
import {DateFormatPipe} from '../pipes/date-format.pipe';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[date]'
})
export class DateDirective {
  inputElement: HTMLInputElement;
  onlyDigitsRegex = RegExp('[0-9]');
  private navigationKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste',
  ];

  constructor(public el: ElementRef,
              private dateFormatPipe: DateFormatPipe) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: { target: { value: any; }; keyCode: number; key: string; ctrlKey: boolean; metaKey: boolean; preventDefault: () => void; }): any {
    const value = e.target.value;

    if ((value.length === 3 || value.length === 6) && e.keyCode === 8) {
      e.target.value = value.slice(0, -1);
    }

    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    if (value.length >= 10 || !this.onlyDigitsRegex.test(e.key)) {
      e.preventDefault();
      return;
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(e: { target: { value: any; }; }): any {
    e.target.value = this.dateFormatPipe.transform(e.target.value, true);
  }

  @HostListener('blur', ['$event'])
  onBlur(e: { target: { value: any; }; }): any {
    e.target.value = this.dateFormatPipe.transform(e.target.value, true);
  }

  @HostListener('paste', ['$event'])
  onPaste(e: { clipboardData: { getData: (arg0: string) => string; }; target: { value: any; }; }): any {
    let pastedInput: string = '';
    // @ts-ignore
    if (window.clipboardData) {
      // Browser is IE
      // @ts-ignore
      pastedInput = window.clipboardData.getData('text');
    } else if (e.clipboardData && e.clipboardData.getData) {
      // Other browsers
      pastedInput = e.clipboardData.getData('text/plain');
    }
    e.target.value = this.dateFormatPipe.transform(pastedInput, true);
  }
}
