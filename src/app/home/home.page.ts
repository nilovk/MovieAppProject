import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, 
  IonItem, IonList, IonListHeader, IonLabel, IonIcon, IonButtons, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MyHttp } from '../services/my-http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonInput, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonButton, RouterLink, IonItem, FormsModule, CommonModule, IonList],
})
export class HomePage {

  // Inject MyHTTP service
  constructor(private mhs: MyHttp) {
    // Registers the heart icon
    addIcons({ heart});
  }

  // Stores user search input
  searchQuery: string = '';
   // Stores list of movies to display
  movies: any[] = [];

  // Runs automatically when page loads
  ngOnInit() {
    // Load trending movies when page opens
    this.loadTrending();
  }

  // Function to search movies based on user input
  async searchMovies() {

    // If search box is empty, show trending movies
    if (!this.searchQuery) {
      this.loadTrending();
      return; //stops the function
    }

    // API request 
    let options = {
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: this.searchQuery,
        api_key: environment.tmdbApiKey
      }
    };

    //Calls MyHttp service to make the HTTP GET request
    //Await pauses the function until the response comes back
    //The result contains data from the movie API 
    let result = await this.mhs.get(options);

    //The list of movies
    this.movies = result.data.results;
    //console.log(result.data.results);
  }

// Load today's trending movies
async loadTrending() {
    try {
      let options = {
        url: 'https://api.themoviedb.org/3/trending/movie/day',
        params: {
          api_key: environment.tmdbApiKey
        }
      };

      // Fetch trending movies
      let result = await this.mhs.get(options);

      this.movies = (result.data.results);
      //console.log(result.data.results);

    } catch (err) {
      this.movies = []; //In case of error return empty list
    }
  }

// Build full image URL for movie poster
getImage(path: string) {
  return 'https://image.tmdb.org/t/p/w200' + path;
}



}
