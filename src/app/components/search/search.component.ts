import {  Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormControl } from "@angular/forms";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {

  temp: any;
  searchResults: any[] = [];
  searchField: FormControl = new FormControl();
  subscription!: Subscription;
  movieResults: any[] = [];

  constructor(
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
  }

  getInput(term: string) {
    this.movieService.searchGetCall(term).subscribe(res => {
      this.temp = res; //kopiera över hela Search array från API
      //console.log(res)
      this.searchResults = this.temp.Search
        .filter((name: { Poster: string, Type: string;}) => //Du kan lägga till fler filter om du vill
          name.Poster !== "N/A" && name.Type === "movie"
        ); //Tar inte med serier, tar inte med filmer utan en bild 
      this.getMovies(this.searchResults); //Hämta komplett info för varje film i search
      this.emptyArray(); //Töm för att inte uppdatering skall haka upp sig
    })
  }

  emptyArray(){
    return this.movieResults = [];
  }

  getMovies(apiResults: any[]){
    apiResults.forEach(e => {
      this.movieService.fetchMovie(e.imdbID).subscribe(res => {
        this.movieResults.push(res);
      })
    })
  }

  ngOnDestroy() {
    // Unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }
}