import { Injectable } from '@angular/core';
import { User } from '../models/user';
import {Observable, of} from 'rxjs';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {switchMap} from 'rxjs/operators'

@Injectable()
export class AuthService {
  user$: Observable<User>
  user:User

  constructor(
    private afauth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private loadingCtrl: LoadingController,
    private toastr: ToastController
  )  
  { 
    this.user$ = this.afauth.authState.pipe(
      switchMap(user => {
        if(user){
          this.afs.doc(`users/${user.uid}`).valueChanges()
        }{
          return of(null)
        }
      })
    )
  }
async login(email, pass){
  const loading = await this.loadingCtrl.create({
    message:'Autenticando...',
    spinner: 'crescent',
    showBackdrop: true
  })

loading.present()

this.afauth.signInWithEmailAndPassword(email, pass).then(( data ) =>{
  if(!data.user.emailVerified){
    loading.dismiss()
    this.toast('Por favor, verifique seu email','danger')
    this.logout()
   
  } else{
    loading.dismiss()
    this.router.navigate(['/home'])
  }
})
}
logout(){
  this.afauth.signOut().then(() =>{
    this.router.navigate(['/login'])
  })
}

async toast(message, status){
  const toast = await this.toastr.create({
    message,
    position:'top',
    color:status,
    duration:2000
  })

  toast.present()
}

}







