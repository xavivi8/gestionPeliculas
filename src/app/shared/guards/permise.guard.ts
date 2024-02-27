import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";


@Injectable({
  providedIn: 'root'
})
export class PermiseGuard implements CanActivate {

  constructor(
    public sharedService: SharedService,
    public router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.sharedService.isAuthenticated(state.url);

    if (!response) {
      // Si el usuario no tiene permisos de administrador, redirigirlo a la página de error 404 ('./404')
      this.router.navigate(['./404']);
    }
    return true;
  }
}
