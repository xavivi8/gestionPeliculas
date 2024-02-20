import { CanMatchFn, Router, Route, UrlSegment, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

const checkAuthStatus = (): Observable<boolean> => {
  return new Observable<boolean>(observer => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    const state: RouterStateSnapshot = inject(RouterStateSnapshot);

    authService.isAuthenticated(state.url).subscribe({
      next: isAuthenticated => {
        console.log('Authenticated: ', isAuthenticated);
        if (isAuthenticated) {
          router.navigate(['/heroes']);
        }
        observer.next(!isAuthenticated);
      },
      error: error => observer.error(error),
      complete: () => observer.complete()
    });
  });
};

export const cantMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(`CanMatch`);
  console.log({ route, segments });
  return checkAuthStatus();
};

export const cantActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log("CanActivate");
  console.log({ route, state });
  return checkAuthStatus();
};
