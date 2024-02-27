import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";

@Injectable({
  providedIn: 'root'
})

//Guard que comprueba si el usuario esta logado, en caso afirmativo no podrá volver al login de la aplicacion.
export class NoLoginGuard implements CanActivate {

  constructor(
    public auth: SharedService,
    public router: Router
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isLoged();
    if (response) {
      this.router.navigate(['/peliculas']);
    }
    return true;
  }
}
