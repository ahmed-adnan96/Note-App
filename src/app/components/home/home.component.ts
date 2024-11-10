import { Data } from './../../interfaces/data';
import { NotesService } from './../../shared/notes.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';

import { SearchingPipe } from 'src/app/pipes/searching.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , FormsModule  ],
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  creatNote !: FormGroup;
  Notes!: Data[];
  desstroyApi!: Subscription;
  errorMsg :string = ''; 
  searchKey:string ='';
  constructor(private _AuthService: AuthService, private _FormBuilder: FormBuilder, private _NotesService: NotesService) {
    this.initializeForrm();
  }

  ngOnInit(): void {
    this._AuthService.FilterDecode();
    this._NotesService.notes$.subscribe({
      next:(res)=>{
        this.Notes = res ; 
        console.log('from note $' , this.Notes);
        
      }
    })

    this.getAllNotesUser()


  }
  AddNoteUser() {
    console.log(this.creatNote.value);
    if(this.creatNote.valid){
      this._NotesService.AddNote(this.creatNote.value).subscribe({
        next: (res) => {
          console.log(res);
          
          this.creatNote.reset();
          this.errorMsg = ''
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = 'Failed to add note. Please try again.'
  
        }
      })
    } else {
      this.errorMsg = 'Please fill out all fields'
    }

  }
  private initializeForrm(): void {
    this.creatNote = this._FormBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]]
    })
  }
  // this.errorMsg = 'Failed to add note. Please try again.'


  getAllNotesUser(){
    this._NotesService.getAllNotes().subscribe({
      next:(res)=>{
          this._NotesService.updateNotes(res.notes)
          
      }
    })
  }



}
