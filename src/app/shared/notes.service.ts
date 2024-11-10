import { Data } from './../interfaces/data';
import { enviroments } from 'src/enviroments/enviroment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Add } from '../interfaces/Add';



@Injectable({
  providedIn: 'root'
})
export class NotesService {

notes = new BehaviorSubject<Data[]>([]);
notes$ = this.notes.asObservable();


constructor(private _HttpClient:HttpClient) { }
 token:any = {
    
      token : "3b8ny__"+localStorage.getItem("Token")
      
 }
AddNote(note:Add):Observable<Add>{
  return this._HttpClient.post<Add>(enviroments.apiURLNote , note , {headers:this.token})
}
getAllNotes():Observable<any>{
  return this._HttpClient.get<any>(enviroments.apiURLNote , {headers:this.token});
}
updateNotes(value:any){
  this.notes.next(value) ; 
  return value;
}

}
