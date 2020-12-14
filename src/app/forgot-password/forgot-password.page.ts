import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email:string
  constructor
  (
    private afauth: AngularFireAuth,
    private loadingCtr: LoadingController,
    private toastr: ToastController,
    private router: Router

  ) { }

  ngOnInit() {
  }
async resetPassword(){
  if(this.email){
    const loading = await this.loadingCtr.create({
      message:"Enviando link de redefinição...",
      showBackdrop:true,
      spinner:"crescent"
    })
     loading.present()

     this.afauth.sendPasswordResetEmail(this.email)
     .then(() =>{
       loading.dismiss()
       this.toast("por favor verifique seu email","success")
       this.router.navigate(['/login'])
     })
     .catch((error) =>{
       loading.dismiss()
      this.toast(error.message,"danger")
     })
  } else(
    this.toast("por favor, preencha o campo","danger")
  )
}
async toast(message,status){
  const toast = await this.toastr.create({
    message:message,
    position:'top',
    color:status,
    duration:2000
  })

  toast.present()
}

}
