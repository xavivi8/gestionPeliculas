import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const url: string = state.url;

    // Aquí se puede usar uno de los métodos de isAuthenticated dependiendo de tus necesidades
    return this.authService.isAuthenticated(url).pipe(
      map((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          return true; // Si el usuario está autenticado, permite la navegación
        } else {
          // Si el usuario no está autenticado, redirige al inicio o a la página de búsqueda
          this.router.navigate(['/auth/login']);
          return false;
        }
      })
    );
  }
}

/* import { Observable, tap } from "rxjs";
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
      if (!isAuthenticated) {
        ROUTER.navigate(['/auth/login']);
      }
    })
  )
};

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(`CanMatch`)
  console.log({ route, segments })

  return checkAuthStatus();
}

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("CanActivate");
  console.log({ route, state })

  return checkAuthStatus();
}
 */
