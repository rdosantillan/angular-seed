import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private jwtHelper: JwtHelper;
    public redirectUrl: string = '';

    constructor(private http: Http, private router: Router) {
        this.jwtHelper = new JwtHelper();
    }

    save(token) {
        localStorage.setItem(environment.sessionToken, token);
    }

    logout() {
        localStorage.removeItem(environment.sessionToken);
        this.router.navigate(['/']);
    }

    redirect() {
        if (this.redirectUrl && this.redirectUrl.length) {
            this.router.navigateByUrl(this.redirectUrl);
            this.redirectUrl = '';
        }
    }

    isLoggedIn() {
        const token = this.getToken();
        return (token.length > 10 && !this.jwtHelper.isTokenExpired(token));
    }

    tokenDetails() {
        return this.isLoggedIn() ? this.jwtHelper.decodeToken(this.getToken()) : {};
    }

    tokenInHeader() {
        return 'Bearer ' + this.getToken();
    }

    getToken() {
        return localStorage.getItem(environment.sessionToken) || '';
    }
}
