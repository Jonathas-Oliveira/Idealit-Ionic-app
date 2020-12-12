import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string
  password:string
  constructor
  (
    private router:Router,
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtr: LoadingController
  ) { }

  ngOnInit() {
  }
register(){
  this.router.navigate(["/register"])
}

forgot(){
  this.router.navigate(["/forgot-password"])
}

async login(){

  if(this.email && this.password)
  {
    const loading = await this.loadingCtr.create({
      message:"Logando...",
      spinner:"crescent",
      showBackdrop:true
    })
    loading.present()

    this.auth.login(this.email,this.password)
    .then(() =>{
      loading.dismiss()
    })
    .catch((error) =>{
      loading.dismiss()
      this.toast(error.message,"danger")
    })
  }
  else{
    this.toast("Por favor, preencha os dados","danger")
  }
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
