import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { SharedService } from "../services/shared.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Guardia de ruta que comprueba si el usuario está logado.
 * Si el usuario está logado, redirige a la página de películas, impidiendo así el acceso al login de la aplicación.
 */
export class NoLoginGuard implements CanActivate {

  constructor(
    public auth: SharedService,
    public router: Router
  ) { }

  /**
   * Método que determina si una ruta puede ser activada.
   * @param {ActivatedRouteSnapshot} route La instantánea de la ruta actual.
   * @param {RouterStateSnapshot} state El estado de la ruta actual.
   * @returns {Promise<boolean>} Una promesa que resuelve a true si la ruta puede ser activada, false de lo contrario.
   */
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const response = await this.auth.isLoged();
    if (response) {
      this.router.navigate(['/peliculas']);
    }
    return true;
  }
}
