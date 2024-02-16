
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const url: string = state.url;

    // Verificar si el usuario está autenticado
    return this.authService.isAuthenticated(url).pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          // Si el usuario está autenticado, redirigir a '/inicio/search'
          this.router.navigate(['/inicio/search']);
          return false; // No permitir la navegación a la URL original
        } else {
          // Si el usuario no está autenticado, permitir la navegación
          return true;
        }
      })
    );
  }
}
/* import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";

const checkAuthStatus = (): Observable<boolean> => {
  const AUTHSERVICE: AuthService = inject(AuthService);
  const ROUTER: Router = inject(Router);
  const STATE: RouterStateSnapshot = inject(RouterStateSnapshot);

  return AUTHSERVICE.isAuthenticated(STATE.url).pipe(
    tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated )),
    tap( isAuthenticated => {
      if ( isAuthenticated ) {
        ROUTER.navigate(['/inicio/search']);
      }
    }),
    map( isAuthenticated => !isAuthenticated )
  )
};

export const cantMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(`CanMatch`)
  console.log({ route, segments })

  return checkAuthStatus();
}

export const cantActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("CanActivate");
  console.log({ route, state })

  return checkAuthStatus();
}
 */
