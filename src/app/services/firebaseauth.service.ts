import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth:AngularFireAuth) {
      this.obtenerId();
   }

  login(email: string, password: string){
   return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    this.auth.signOut();
  }

  registrar(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
   }

   async obtenerId(){
      const user = await this.auth.currentUser;
      if (user === null){
        return null;
      }else{
        return user.uid;
      }
   }

   estadoAutenticacion(){
    return this.auth.authState;
   }

   async actualizarUsuario(email:string, pass: string){
    const user = await this.auth.currentUser;
    if (user === null){
      return null;
    }else{
  
      if (email) {
        await user.updateEmail(email);
      }
  
      if (pass) {
        await user.updatePassword(pass);
      }
      return true;
    }
   }
}
