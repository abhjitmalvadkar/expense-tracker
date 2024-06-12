import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges,} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[onlyDigit]',
})
export class OnlyDigitsDirective implements OnChanges {

  @Input() decimal = true;
  @Input() decimalSeparator = '.';
  @Input() min = -Infinity;
  @Input() max = Infinity;
  @Input() pattern?: string | RegExp;
  inputElement: HTMLInputElement;
  private hasDecimalPoint = false;
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
  private regex: RegExp | null | undefined;

  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  private static triggerEvent(el: HTMLInputElement, type: string): void {
    if ('createEvent' in document) {
      // modern browsers, IE9+
      const e = document.createEvent('HTMLEvents');
      e.initEvent(type, false, true);
      el.dispatchEvent(e);
    }
  }

  // The following 2 methods were added from the below article for browsers that do not support setRangeText
  // https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
  private static insertAtCursor(myField: HTMLInputElement, myValue: string): void {
    const startPos: any = myField.selectionStart;
    const endPos: any = myField.selectionEnd;

    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    const pos = startPos + myValue.length;
    myField.focus();
    myField.setSelectionRange(pos, pos);

    OnlyDigitsDirective.triggerEvent(myField, 'input');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pattern']) {
      this.regex = this.pattern ? RegExp(this.pattern) : null;
    }

    if (changes['min']) {
      const maybeMin = Number(this.min);
      this.min = isNaN(maybeMin) ? -Infinity : maybeMin;
    }

    if (changes['max']) {
      const maybeMax = Number(this.max);
      this.max = isNaN(maybeMax) ? Infinity : maybeMax;
    }
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): any {
    if (
      this.navigationKeys.indexOf(e.key) > -1 ||
      (e.key === 'a' && e.ctrlKey) ||
      (e.key === 'c' && e.ctrlKey) ||
      (e.key === 'v' && e.ctrlKey) ||
      (e.key === 'x' && e.ctrlKey) ||
      (e.key === 'a' && e.metaKey) ||
      (e.key === 'c' && e.metaKey) ||
      (e.key === 'v' && e.metaKey) ||
      (e.key === 'x' && e.metaKey) // Allow: Cmd+X (Mac)
    ) {
      // let it happen, don't do anything
      return;
    }

    let newValue = '';
    newValue = this.forecastValue(e.key);
    if (this.decimal && e.key === this.decimalSeparator) {
      if (newValue.split(this.decimalSeparator).length > 2) { // has two or more decimal points
        e.preventDefault();
        return;
      } else {
        this.hasDecimalPoint = newValue.indexOf(this.decimalSeparator) > -1;
        return; // Allow: only one decimal point
      }
    }

    if (this.decimal && newValue.split(this.decimalSeparator)[1]?.length > 2) {
      e.preventDefault();
      return;
    }


    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
      return;
    }

    newValue = newValue || this.forecastValue(e.key);
    // check the input pattern RegExp
    if (this.regex) {
      if (!this.regex.test(newValue)) {
        e.preventDefault();
        return;
      }
    }

    const newNumber = Number(newValue);
    if (newNumber > this.max || newNumber < this.min) {
      e.preventDefault();
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any): void {
    let pastedInput: any;
    // @ts-ignore
    if (window.clipboardData) {
      // Browser is IE
      // @ts-ignore
      pastedInput = window.clipboardData.getData('text');
    } else if (event.clipboardData && event.clipboardData.getData) {
      // Other browsers
      pastedInput = event.clipboardData.getData('text/plain');
    }

    this.pasteData(pastedInput);
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    const textData: any = event?.dataTransfer?.getData('text');
    this.inputElement.focus();
    this.pasteData(textData);
    event.preventDefault();
  }

  private pasteData(pastedContent: string): void {
    const sanitizedContent = this.sanitizeInput(pastedContent);
    const pasted = document.execCommand('insertText', false, sanitizedContent);
    if (!pasted) {
      // if (this.inputElement.setRangeText) {
      //   const { selectionStart: start, selectionEnd: end } = this.inputElement;
      //   this.inputElement.setRangeText(sanitizedContent, start, end, 'end');
      // } else {
      //   // Browser does not support setRangeText, e.g. IE
      //   this.insertAtCursor(this.inputElement, sanitizedContent);
      // }
      OnlyDigitsDirective.insertAtCursor(this.inputElement, sanitizedContent);
    }
    if (this.decimal) {
      this.hasDecimalPoint =
        this.inputElement.value.indexOf(this.decimalSeparator) > -1;
    }
  }

  // end stack overflow code

  private sanitizeInput(input: string): string {
    let result: string;
    if (this.decimal && this.isValidDecimal(input)) {
      const regex = new RegExp(`[^0-9${this.decimalSeparator}]`, 'g');
      result = input.replace(regex, '');
    } else {
      result = input.replace(/[^0-9]/g, '');
    }

    const maxLength = this.inputElement.maxLength;
    if (maxLength > 0) {
      // the input element has maxLength limit
      const allowedLength = maxLength - this.inputElement.value.length;
      result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
    }
    return result;
  }

  private isValidDecimal(str: string): boolean {
    if (this.hasDecimalPoint) {
      // the input element already has a decimal separator
      const selectedText = this.getSelection();
      if (selectedText && selectedText.indexOf(this.decimalSeparator) > -1) {
        return str.split(this.decimalSeparator).length <= 2;
      } else {
        return str.indexOf(this.decimalSeparator) < 0;
      }
    } else {
      return str.split(this.decimalSeparator).length <= 2;
    }
  }

  private getSelection(): string {
    const selectionStart: any = this.inputElement.selectionStart;
    const selectionEnd: any = this.inputElement.selectionEnd;
    const value: any = this.inputElement.value;


    return value.substring(
      selectionStart,
      selectionEnd
    );
  }

  private forecastValue(key: string): string {
    const selectionStart: any = this.inputElement.selectionStart;
    const selectionEnd: any = this.inputElement.selectionEnd;
    const oldValue: any = this.inputElement.value;
    const selection: any = oldValue.substring(selectionStart, selectionEnd);
    return selection
      ? oldValue.replace(selection, key)
      : oldValue.substring(0, selectionStart) +
      key +
      oldValue.substring(selectionStart);
  }
}
