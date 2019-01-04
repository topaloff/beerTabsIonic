import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Beer } from './beer';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http:HttpClient) { }

// ** Read  beers
    getBeers(): Observable<Beer[]> {
      return this.http.get<Beer[]>('https://beers-cf53e.firebaseio.com/beers.json')
        .pipe(
          tap(data => {
            data
          }),
          catchError(this.handleError('getBeers', []))
        );
    }

    //** Read one beer */
    getBeerByKey(key: string): Observable<Beer[]>{
      console.log('https://beers-cf53e.firebaseio.com/beers/'+key+'.json')
      return this.http.get<Beer[]>('https://beers-cf53e.firebaseio.com/beers/'+key+'.json')
      .pipe(
        tap(data => JSON.stringify(data)),
        catchError(this.handleError('getBeerByKey', []))
      );
    }

      // POST :  Add a beer
      addBeer(beer: Beer): Observable<Beer> {
        let url = `https://beers-cf53e.firebaseio.com/beers.json`;
        return this.http.post<Beer>(url, beer, {responseType: 'json'}).pipe(
          tap((product: Beer) => console.log('beer added')),
          catchError(this.handleError<Beer>('addBeer'))
        );
      }


      // PUT :  Edit a beer
      editBeer(beer: Beer, key: string): Observable<Beer> {
        const url = `https://beers-cf53e.firebaseio.com/beers/`+key+'.json';
        return this.http.put<Beer>(url, beer, {responseType: 'json'}).pipe(
          tap((product: Beer) => console.log('beer edited')),
          catchError(this.handleError<Beer>('editBeer'))
        );
      }

      /** DELETE: delete one beer */
      deleteBeer(key: string): Observable<Beer>{
        let url = `https://beers-cf53e.firebaseio.com/beers/`+key+'.json';
        return this.http.delete<Beer>(url)
          .pipe(
            tap(data=>data),
            catchError(this.handleError<Beer>('deleteBeer'))
          );
      }


      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}

