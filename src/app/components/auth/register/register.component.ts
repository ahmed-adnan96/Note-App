import { AuthService } from './../../../shared/auth.service';
import { User } from './../../../interfaces/user';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser !: FormGroup;
  errorMsg !: any;
  isReady: boolean = false;
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router) {
    this.newUser = this._FormBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
      age: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    })
  }
  createUser() {
    if (this.newUser.valid) {
      this.isReady = true;
      this._AuthService.register(this.newUser.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isReady = false;
          this._Router.navigate(['/login'])
        },
        error: (err) => {
          this.errorMsg = err.error.msg
          console.log(this.errorMsg);

          this.isReady = false;

        }
      })




    } else {
      alert('not valud')
    }

  }

  get name() {
    return this.newUser.get('name')
  }

  get email() {
    return this.newUser.get('email')
  }
  get password() {
    return this.newUser.get('password')
  }
  get age() {
    return this.newUser.get('age')
  }
  get phone() {
    return this.newUser.get('phone')
  }
}

