import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() icon: string = '';
  @Input() svgIcon: string = '';
  @Input() badgeValue: string = '';
  @Input() cssClass: string = '';
  @Input() size: string = '1.8rem';
}
