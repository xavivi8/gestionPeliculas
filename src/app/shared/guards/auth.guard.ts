import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public sharedService: SharedService,
    public router: Router
  ){ }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.sharedService.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['auth']);
    }
    return true;
  }
}
