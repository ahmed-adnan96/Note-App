import { NotesService } from './../../shared/notes.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AppRoutingModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private _NotesService: NotesService) { }
  isLogged: boolean = false;
  isRegester: boolean = false;
  isLogoutNow: boolean = true;
  private routeUrlLogin !: Subscription;
  private routeUrlRegist !: Subscription;
  private looog !: Subscription;

  ngOnInit(): void {
    this._AuthService.isLoginSubject$.subscribe(
      (status) => {
        this.isLogged = status;
        console.log('is Loged', this.isLogged);

      }
    )
    this._AuthService.isLogoutB$.subscribe(
      (status) => {
        if (localStorage.getItem('Token') !== null) {
          this.isLogoutNow = status;
          console.log("isLogout", this.isLogoutNow);

        }
      }
    )
    this._AuthService.isRegisteSubject$.subscribe(
      (status) => {
        this.isRegester = status;
      }
    )
    this.routeUrlLogin = this._Router.events.pipe(
      filter(value => value instanceof NavigationEnd)
    ).subscribe(
      () => {
        const path = this._Router.url.split('?')[0]
        if (path === '/login') {
          this.isLogged = true;
          this._AuthService.updatStatusLogout(true)

        }
      }
    )

    this.routeUrlRegist = this._Router.events.pipe(
      filter(value => value instanceof NavigationEnd)
    ).subscribe(
      () => {
        const currentPath = this._Router.url.split('?')[0];
        if (currentPath === '/register') {
          this.isLogged = false
        }
      }
    )

  }

  isLoggedValue() {
    this._AuthService.updateStatusLogin(true);
    this._AuthService.updateStatusRegister(false);
  }
  isRegisterValue() {
    this._AuthService.updateStatusRegister(true);
    this._AuthService.updateStatusLogin(false);
  }
  isLogOut() {
    this._NotesService.updateNotes([])
    
    
    localStorage.removeItem("Token")

    this._Router.navigate(['/login'])
  
    this.isLogoutNow = true;



  }




}
