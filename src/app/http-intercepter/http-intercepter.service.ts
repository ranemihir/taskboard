import { DOCUMENT } from '@angular/common';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../shared/state';
import * as CurrentUserSelectors from "src/app/auth/state/current_user/current_user.selectors";
import { CurrentUser } from '../shared/types';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    token?: string | null;

    constructor(
        private store: Store<AppState>
    ) {
        this.store.select(CurrentUserSelectors.get).subscribe((currentUser: CurrentUser | null) => {
            if (currentUser && currentUser != null) {
                this.token = currentUser.token;
            }
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'withCredentials': 'true',
                'token': this.token || ''
            },
        });

        return next.handle(cloneReq);
    }
}