import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['../styles.css', './secondary-button.component.css']
})
export class SecondaryButtonComponent {
  @Input() throttleTime: number = 1000;
  @Input() isDisabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() buttonId: string = '';
  @Output() handleClick = new EventEmitter();
}
