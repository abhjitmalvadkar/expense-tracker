import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {CommonService} from "./common.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import * as moment from 'moment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  messageQueue = [];
  processingMessage = false;
  excludedUrlsRegex: RegExp[];
  excludedUrls = ['.svg'];

  constructor(
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.excludedUrlsRegex =
      this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const passThrough: boolean =
      !!this.excludedUrlsRegex.find(regex => regex.test(req.url));

    if (passThrough) {
      return next.handle(req);
    }

    let headers = req.headers;

    const body = req.body;
    let requestToSend: HttpRequest<any>;

    return of(true).pipe(
      switchMap(() => {
        if (this.commonService.isAuthenticated()) {
          const authenticationToken = this.commonService.getAuthenticationToken();

          const tokenDetails = JSON.parse(atob(authenticationToken.split('.')[1]));

          if (moment(new Date(tokenDetails.exp * 1000)).subtract(2, 'm').isBefore(new Date())) {
            this.commonService.logout();
          }
        }


        return of({})
      }),
      switchMap((response: any) => {
        if (response?.access_token) {
          this.commonService.setAuthenticationToken(response.access_token);
        }

        if (this.commonService.getAuthenticationToken()) {
          headers = headers.append('x-auth-token', this.commonService.getAuthenticationToken());
        }

        requestToSend = req.clone({headers, body});

        return next.handle(requestToSend).pipe(
          map((response) => {
            if (
              (response['status'] && (response['status'] !== 200 && response['status'] !== 201))
            ) {
              throw response;
            }

            return response;
          }),
          catchError((errorResponse) => this.handleError(errorResponse))
        );
      })
    )
  }

  handleError(response) {
    if (response.status === 401) {
      const currentUrl = this.router.url;
      if (currentUrl.includes('login')) {
        return null;
      }

      const url = currentUrl.split('?')[0];

      const urlArr = url.split('/');

      this.router.navigate([`${urlArr[1]}/${urlArr[2] === 'm' ? 'm/' : ''}not-found`]);

      return null;
    }

    const errorObject =
      (response && response.error) ||
      (response && response.body) ||
      {error_description: 'Oops! Something went wrong.'};

    this.addMessageToQueue(errorObject.error_description || errorObject.message);

    return throwError(errorObject);
  }

  addMessageToQueue(message) {
    this.messageQueue.push(message);

    if (!this.processingMessage) {
      this.displaySnackbar();
    }
  }

  displaySnackbar() {
    const nextMessage = this.getNextMessage();

    if (!nextMessage) {
      this.processingMessage = false; // No message in the queue, set flag false
      return;
    }

    this.processingMessage = true; // A message was dequeue and is being processed

    this.snackBar
      .open(nextMessage, undefined, {
        duration: 1500,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'danger',
      })
      .afterDismissed()
      .subscribe(() => {
        this.displaySnackbar();
      });
  }

  getNextMessage(): string | undefined {
    return this.messageQueue.length ? this.messageQueue.shift() : null;
  }
}
