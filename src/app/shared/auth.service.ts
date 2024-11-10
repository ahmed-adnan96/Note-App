import { User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';
import { enviroments } from 'src/enviroments/enviroment';
import { Login } from '../interfaces/login';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoginSubject = new BehaviorSubject<boolean>(true);
  private isRegisteSubject = new BehaviorSubject<boolean>(false) ;
  // private isLogoutSubject = new BehaviorSubject<boolean>(false);
  private  isLogoutBehvaior = new BehaviorSubject<boolean>(false)
  isLoginSubject$ = this.isLoginSubject.asObservable();
  isRegisteSubject$ = this.isRegisteSubject.asObservable();
  // isLogoutSubject$ = this.isLogoutSubject.asObservable();
  isLogoutB$ = this.isLogoutBehvaior.asObservable(); 
  constructor( private _HttpClient: HttpClient ) { }

register(userData:User):Observable<User>{
  return this._HttpClient.post<User>(`${enviroments.apiURlUser}signUp` , userData ).pipe(
    retry(2)
  )
}
login(user:Login):Observable<Login>{
  return this._HttpClient.post<Login>(`${enviroments.apiURlUser}signIn` , user)
}
  // status(value : string) :void{
  //     this.statusAuth.next(value)
  // }
  updateStatusLogin(status:boolean):void{
      this.isLoginSubject.next(status);
  }
  updateStatusRegister(status:boolean):void{
    this.isRegisteSubject.next(status)
  }
  // updateStatusLogout(status:boolean):void{
  //   this.isLogoutSubject.next(status);
  // }
  updatStatusLogout(value:boolean){
    this.isLogoutBehvaior.next(value)
  }
  FilterDecode(): any {
    if(localStorage.getItem('Token') !== null )
    {
      let decode = JSON.stringify(localStorage.getItem('Token')); 
      let incode = jwtDecode(decode)
      console.log(incode); 
      console.log(typeof incode);
      
      
      return incode;
    }


  }
 get isOnline():boolean{
    return localStorage.getItem('Token') == null ? false : true
  }
}
