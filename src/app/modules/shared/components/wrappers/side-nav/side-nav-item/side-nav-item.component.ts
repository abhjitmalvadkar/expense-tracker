import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-side-nav-item',
  templateUrl: './side-nav-item.component.html',
  styleUrls: ['./side-nav-item.component.css']
})
export class SideNavItemComponent implements OnInit, OnDestroy {
  @Input() option: any;
  @Input() badgeValue: number;

  routerEventSubscription: Subscription;

  isActive = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isActive = this.router.url.includes(this.option.link);

    this.routerEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isActive = event.url.includes(this.option.link);
      }
    });
  }

  navigateTo(link){
    this.router.navigateByUrl(link);
  }

  ngOnDestroy() {
    this.routerEventSubscription?.unsubscribe();
  }
}
