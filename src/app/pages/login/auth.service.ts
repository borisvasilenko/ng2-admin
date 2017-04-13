import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable, Subject, Observer} from 'rxjs';
import {CookieService} from 'ng2-cookies';

const AUTH_COOKIE = 'Admin-Auth';

@Injectable()
export class AuthService {
    
    private _authenticated = new Subject<boolean>();

    constructor(
        private http: Http,
        private cookieService: CookieService,
    ) {}

    get authenticated() {
        return this._authenticated.asObservable();
    }

    login(username: string, password: string) {
        // return this.http.post(`/api/login`, {username, password})
        return Observable.create((observer: Observer<void>) => {
                setTimeout(() => {
                    observer.next(null);
                }, 1000);
            })
            .do(() => {
                this._authenticated.next(true);
            });
    }

    checkAuth() {
        let authenticated = this.cookieService.check(AUTH_COOKIE);
        if (!authenticated) {
            this._authenticated.next(false);
            return;
        }

        this._authenticated.next(true);
    }

    logout() {
        return this.http.get(`/api/logout`)
            .do(() => {
                this.cookieService.delete(AUTH_COOKIE, '/');
            });
    }
}