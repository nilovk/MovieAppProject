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
    IonContent, IonButton, RouterLink, IonItem, FormsModule, CommonModule, IonList, IonLabel],
})
export class HomePage {

  constructor(private mhs: MyHttp) {
    // Registers the heart icon so it can be used in HTML
    addIcons({ heart});
  }

  searchQuery: string = '';
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
      return;
    }
    let options = {
      url: 'https://api.themoviedb.org/3/search/movie',
      params: {
        query: this.searchQuery,
        api_key: environment.tmdbApiKey
      }
    };

    let result = await this.mhs.get(options);

    this.movies = result.data.results || [];
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

      let result = await this.mhs.get(options);

      this.movies = (result.data.results || []).slice(0, 5);
    } catch (err) {
      this.movies = [];
    }
  }

// Build full image URL for movie poster
getImage(path: string) {
  return 'https://image.tmdb.org/t/p/w200' + path;
}



}
