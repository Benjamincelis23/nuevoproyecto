import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {

  constructor(
    private firebaseSvc: FirebaseService,
    private router: Router  // Inyectar el Router de Angular
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.firebaseSvc.getAuthState().pipe(map(login => {
      if (login) {
        return true; // El usuario está autenticado, permite el acceso
      } else {
        // El usuario no está autenticado, redirige a la página de login
        this.router.navigate(['/login']);
        return false; // Bloquea el acceso a la ruta protegida
      }
    }));
  }
}
