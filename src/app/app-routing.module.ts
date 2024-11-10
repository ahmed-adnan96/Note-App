import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'' , 
    redirectTo : 'login' , 
    pathMatch:'full'
  } , 
  {
    path: 'login', loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  } , 
  {
    path : 'register' , loadComponent:()=> import('./components/auth/register/register.component').then((m)=>m.RegisterComponent) , 
    title:'Register'
  } , 
  {
    path:'home' , canActivate:[authGuard] , loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent) , title:'Home' ,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
