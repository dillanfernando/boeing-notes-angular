import { Component, OnInit, Inject } from '@angular/core';
import { NotesService } from '../notes.service';


import { INote } from '../note';


@Component({
  selector: '[app-notes]',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  Id = 0;
  
  notes: INote[] = [];
  note : INote = {noteId:'0', user: '' ,subject:null  ,note:null}

  constructor(private _noteService: NotesService) { }

  ngOnInit() {
    
  }

  getNotes(): void {
    this._noteService.getNotes()
    .subscribe(notes => this.notes = notes);

  }

  add(subject: string, note: string): void {
    if (!subject || !note) {  return; }
    var user  = "dillan" as string;
    subject = subject.trim();
    note = note.trim();
    console.log(note +' ' + subject);
    this.Id ++;
    var noteId = this.Id.toString();

    
    this._noteService.addNote({noteId, user, subject, note} as INote)
      .subscribe(note => {
        this.notes = [];
      });
  }

}


