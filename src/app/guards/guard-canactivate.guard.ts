import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseauthService } from '../services/firebaseauth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardCanactivateGuard implements CanActivate {
estado:boolean;
    constructor(public auth:FirebaseauthService, ){
      this.auth.estadoAutenticacion().subscribe(res => {
        if (res !== null){
          this.estado = true
        }else{
          this.estado = false
        }
      });
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.estado;
  }
  
}
