import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, Observer} from 'rxjs';

import {AuthService} from './auth.service';

@Injectable()
export class AuthResolver implements Resolve<void> {
    constructor(private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return Observable.create((observer: Observer<void>) => {
            
            this.authService.authenticated.filter(x => !!x).take(1).subscribe(() => {
                observer.next(null as any);
                observer.complete();
            });

            this.authService.checkAuth();            
        });
    }
}