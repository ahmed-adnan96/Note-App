import { NotesService } from './../../../shared/notes.service';
import { AuthService } from './../../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginUser !: FormGroup;
  errorMsg !: any;
  logoutuser : boolean = false ;
  isReady: boolean = false;
  notes:[]=[];
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _NotesService:NotesService ,private _Router: Router)   {
    this.loginUser = this._FormBuilder.group({
    
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],

    
    })
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  createUser() {
    if (this.loginUser.valid) {
      this.isReady = true;
      this._AuthService.login(this.loginUser.value).subscribe({
        next: (res) => {
        let myToken   = res.token  ;
          console.log('User = > ' , res.token);
          this.isReady = false;
          if(myToken){
            localStorage.setItem('Token' , myToken)
            this._NotesService.updateNotes([])
            this._AuthService.updatStatusLogout(false)
            this._Router.navigate(['/home'])
          }
        },
        error: (err) => {
          this.errorMsg = err.error.msg
          console.log(this.errorMsg);
          // this._AuthService.updatStatusLogout(true)

          this.isReady = false;

        }


      })




    } else {
      alert('not valud')
    }
 

  }



  get email() {
    return this.loginUser.get('email')
  }
  get password() {
    return this.loginUser.get('password')
  }



     


}
