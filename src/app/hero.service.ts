import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero.model';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // Url to web api
  private httpOptions = {
    headers: new HttpHeaders({'Content-type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }


  private _log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this._log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  // TODO: Why do I need an or {} | Hero
  getHero(id: number): Observable<{} | Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<{} | Hero>(url).pipe(
      tap(_ => this._log(`fetched hero id=${id}`)),
      catchError(this.handleError(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions ).pipe(
      tap(_ => this._log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this._log(`Add hero: ${newHero.id}`)),
      catchError(this.handleError<any>(`addHero`))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this._log(`delete hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  seatchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this._log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>(`searchHeroes`, []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this._log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
