import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../shared/state';
import * as CurrentUserSelectors from 'src/app/auth/state/current_user/current_user.selectors';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    accessToken?: string | null;

    constructor(private store: Store<AppState>) {
        this.store.select(CurrentUserSelectors.getToken).subscribe((accessToken: string | null) => this.accessToken = accessToken);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('access token =>', this.accessToken);

        const cloneReq = req.clone({
            setHeaders: {
                'x-access-token': this.accessToken || '',
                'Content-Type': 'application/json'
            }
        });

        return next.handle(cloneReq);
    }
}