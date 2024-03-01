import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";


@Injectable({
  providedIn: 'root'
})
/**
 * Guardia de ruta que comprueba si el usuario tiene permisos de administrador.
 * Si el usuario no tiene permisos de administrador, se le redirige a la página de error 404.
 */
export class PermiseGuard implements CanActivate {

  constructor(
    public sharedService: SharedService,
    public router: Router
  ) { }

  /**
   * Método que determina si una ruta puede ser activada.
   * @param {ActivatedRouteSnapshot} route La instantánea de la ruta actual.
   * @param {RouterStateSnapshot} state El estado de la ruta actual.
   * @returns {Promise<boolean>} Una promesa que resuelve a true si la ruta puede ser activada, false de lo contrario.
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.sharedService.isAuthenticated(state.url);

    if (!response) {
      // Si el usuario no tiene permisos de administrador, redirigirlo a la página de error 404 ('./404')
      this.router.navigate(['./404']);
      return false;
    }
    return true;
  }
}
