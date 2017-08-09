import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    private jwtHelper: JwtHelper;

    constructor(private router: Router, private authService: AuthService) {
        this.jwtHelper = new JwtHelper();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token: string = localStorage.getItem(environment.sessionToken) || '';

        if (token.length > 10 && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }

        this.authService.redirectUrl = state.url;
        this.router.navigate(['/'], { queryParams: { action: 'login' } });

        return false;
    }
}
