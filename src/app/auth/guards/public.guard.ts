
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanMatchFn, UrlSegment, CanActivateFn } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(isAutheticated => console.log('AuthenticatedPublic:', isAutheticated)),
      tap(
        isAutheticated => {
          console.log("Prueba: "+isAutheticated);

          if (isAutheticated) {
            console.log("222222222222Prueba: ");
            router.navigate(['/peliculas/search'])
          }
      }),
      map(isAuthenticated => !isAuthenticated) // Return the opposite of what we got back
    )
}

export const cantMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log('CanMatch');
  console.log({ route, segments });

  return checkAuthStatus();
}
export const cantActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log('CanActivate');
  console.log({ route, state });

  return checkAuthStatus();
}
