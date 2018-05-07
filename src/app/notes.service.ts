import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {  catchError, map, tap } from 'rxjs/operators';

import * as Rx from 'rxjs';

import { INote } from './note';




@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private httpHeaderOptions = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  
  constructor(private http : HttpClient) { }

  getNotes (): Rx.Observable<INote[]> {
    return this.http.get<INote[]>('/services/notes/get', this.httpHeaderOptions)
    .pipe(
      tap(notes => console.log(`retrieved notes`)),
      catchError(this.handleError('getNotes'))
    );
  }


 addNote (noted: INote): Rx.Observable<INote> {
  return this.http.post<INote>('/services/notes/add', noted, this.httpHeaderOptions).pipe(
    tap((note: INote) => console.log(`added note w/ title=${noted.subject}`)),
    catchError(this.handleError<INote>('addNote'))
  );
}

  private handleError<INote> (operation = 'operation', result?: INote) {
    return (error: any): Rx.Observable<INote> => {
      if(!error){
        console.error(error); 
      }
      return Rx.of(result as INote);
    };
  }
}
