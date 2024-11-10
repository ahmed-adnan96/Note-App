import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

export const authGuard: CanActivateFn = () => {
  let router = inject(Router);
  let isOn = inject(AuthService)
  if( isOn.isOnline){
    return true;
  }else{    
    alert('please Login First .....')
    router.navigate(['/login'])
    return false 
  }
};
