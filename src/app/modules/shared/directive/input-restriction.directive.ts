import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {CommonService} from "../services/common.service";
import {FormGroup} from "@angular/forms";
@Directive({
  selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
  inputElement: ElementRef;
  @Input('appInputRestriction') appInputRestriction: string = '';
  @Input('parentFormGroup') parentFormGroup: FormGroup = new FormGroup<any>({});
  @Input('controlName') controlName: string = '';
  constructor(
    el: ElementRef,
    private commonService: CommonService
  ) {
    this.inputElement = el;
  }
  @HostListener('keypress', ['$event']) onKeyPress(event: any) {
    if (this.appInputRestriction === 'noInteger') {
      this.integerOnly(event);
    } else if (this.appInputRestriction === 'noSpecialChars') {
      this.noSpecialChars(event);
    }
  }
  integerOnly(event: KeyboardEvent) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
      (e.keyCode === 65 && e.ctrlKey) ||
      (e.keyCode === 67 && e.ctrlKey) ||
      (e.keyCode === 86 && e.ctrlKey) ||
      (e.keyCode === 88 && e.ctrlKey)) {
      // let it happen, don't do anything
      return;
    }
    if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
      e.preventDefault();
    }
  }
  noSpecialChars(event: KeyboardEvent) {
    const e = <KeyboardEvent>event;
    if (e.key === 'Tab' || e.key === 'TAB') {
      return;
    }
    let k;
    k = event.keyCode;  // k = event.charCode;  (Both can be used)
    if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
      return;
    }
    const ch = String.fromCharCode(e.keyCode);
    const regEx = new RegExp(this.commonService.alphanumericRegex);
    if (regEx.test(ch)) {
      return;
    }
    e.preventDefault();
  }
  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    let regex;
    if (this.appInputRestriction === 'noInteger') {
      regex = new RegExp(/\d/, 'g');
    } else if (this.appInputRestriction === 'noSpecialChars') {
      regex = new RegExp(/[\[\]/$&+,:;=?@#|'<>.^*()%!-_]/, 'g');
    }
    if (regex) {
      const e = <ClipboardEvent>event;
      let pasteData = e.clipboardData?.getData('text/plain') || '';
      pasteData = pasteData.replaceAll(regex, '')
      this.parentFormGroup.controls[this.controlName].patchValue(pasteData, {emitEvent: false})
      e.preventDefault();
    }
  }
}
