import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private ids = ['tt3896198', 'tt1160419','tt0120338', 'tt10223460', 'tt0117571', 'tt0245429', 'tt4154796', 'tt0108052'];

  constructor(
    private http: HttpClient,
  ) { }

  searchGetCall(term: string): Observable<any> {    
    return this.http.get<any>(`http://www.omdbapi.com/?s=${term}&apikey=1d799ea5`);
  }

  fetchMovie(term: string): Observable<any> {
    //console.log("Here");
    const apiURL = `http://www.omdbapi.com/?i=${term}&apikey=1d799ea5&plot=full`;
    return this.http.get<any>(apiURL);
  }

  getMovieId(){
    return this.ids;
  }
}
