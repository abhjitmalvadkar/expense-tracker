import {Component, Renderer2} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {CommonService} from "./modules/shared/services/common.service";
import * as fromRoot from 'src/app/state/app.state';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ClearLoading, SetScreenType} from "./modules/shared/core/shared.actions";
import {isLoading} from "./modules/shared/core/shared.selectors";
import {MatDialog} from "@angular/material/dialog";
import {LoadingScreenComponent} from "./modules/shared/components/loading-screen/loading-screen.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school_voices';
  isLoadingScreenOpen: boolean = false;
  private readonly onDestroy: Subject<any> = new Subject<any>();

  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver,
    public commonService: CommonService,
    private router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {
    this.store.dispatch(ClearLoading());

    this.router.events
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => {
        if (value instanceof NavigationEnd) {
          console.log('Navigation has ended');
          this.commonService.onNavigationEnd.next(value);
        }
      });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .pipe(takeUntil(this.onDestroy))
      .subscribe((result) => {
        this.clearBodySizeClasses();

        if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
          this.store.dispatch(SetScreenType({screenType: 'mobile'}));
          $('body').addClass('xs');
        } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
          this.store.dispatch(SetScreenType({screenType: 'tablet'}));
          $('body').addClass('sm');
        } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
          this.store.dispatch(SetScreenType({screenType: 'desktop'}));
          $('body').addClass('md');
        } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
          this.store.dispatch(SetScreenType({screenType: 'desktop'}));
          $('body').addClass('lg');
        } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
          this.store.dispatch(SetScreenType({screenType: 'desktop'}));
          $('body').addClass('xl');
        }

        this.commonService.closeDialog();
      });

    this.store
      .pipe(select(isLoading))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        if (!!data.length && !this.isLoadingScreenOpen) {
          this.commonService.isLoadingScreenOpen.next(true);
          this.dialog.open(LoadingScreenComponent, {
            backdropClass: 'loader-backdrop',
            panelClass: 'loader-panel'
          });
        }

        if (!data.length) {
          this.commonService.isLoadingScreenOpen.next(false);
        }
      });

    this.commonService
      .isLoadingScreenOpen
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.isLoadingScreenOpen = data;
      });
  }

  clearBodySizeClasses() {
    const body = $('body');
    body.removeClass('xs');
    body.removeClass('sm');
    body.removeClass('md');
    body.removeClass('lg');
    body.removeClass('xl');
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loader');
    this.renderer.setStyle(loader, 'display', 'none');
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }
}
