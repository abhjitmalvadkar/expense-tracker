import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['../styles.css', './primary-button.component.css']
})
export class PrimaryButtonComponent {
  @Input() throttleTime: number = 1000;
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() buttonId: string = '';
  @Output() handleClick = new EventEmitter();
}
