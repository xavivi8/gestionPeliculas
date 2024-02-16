import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) {}


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['/auth']);
    }

    return response;
  }

}
