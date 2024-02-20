import { Injectable } from "@angular/core";
import { CanMatchFn, Router, Route, UrlSegment, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private checkAuthStatus(url: string): Observable<boolean> {
    return this.authService.isAuthenticated(url).pipe(
      tap(isAuthenticated => {
        console.log('Authenticated: ', isAuthenticated);
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login']);
        }
      })
    );
  }

  canMatchGuard: CanMatchFn = (
    route: Route,
    segments: UrlSegment[]
  ) => {
    console.log(`CanMatch`);
    console.log({ route, segments });
    const url = segments.map(seg => seg.path).join('/');
    return this.checkAuthStatus(url);
  }

  canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    console.log("CanActivate");
    console.log({ route, state });
    return this.checkAuthStatus(state.url);
  }
}

