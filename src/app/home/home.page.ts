import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  taskName: any = ''; 
  taskList = []; 
  
  constructor
  (
    private afauth: AngularFireAuth,
  private router: Router
  ) {}
  
  logout(){
    this.afauth.signOut()
    .then(() =>{
      this.router.navigate(["/login"])
    })
  }

  addTask() {
    if (this.taskName.length > 0) {
    let task = this.taskName;
    this.taskList.push(task);
    this.taskName = "";
    }
    }
    deleteTask(index) {
    this.taskList.splice(index, 1);
    }
  
}
