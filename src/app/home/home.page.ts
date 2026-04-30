import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, 
  IonItem, IonList, IonListHeader, IonLabel, IonIcon, IonButtons, IonInput } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [IonInput, IonButtons, IonIcon, IonHeader, IonToolbar, IonTitle, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
    IonContent, IonButton, RouterLink, IonItem, FormsModule, CommonModule, IonList, IonLabel],
})
export class HomePage {

  constructor() {
    addIcons({ heart});
  }

  searchQuery: string = '';
  movies: any[] = [];

  ngOnInit() {
    // Load trending movies when page opens
    this.loadTrending();
  }

  searchMovies() {

    if (!this.searchQuery) {
      // If search is empty, show trending movies
      this.loadTrending();
      return;
    }
    var self = this;

    // Do nothing if input is empty
    // if (!this.searchQuery) return;

    // Send request API with search query
    fetch('https://api.themoviedb.org/3/search/movie?query=' + this.searchQuery + '&api_key=' + environment.tmdbApiKey)
      .then(function(res) {
        // Convert response to JSON format
        return res.json();
      })
      .then(function(data) {
        self.movies = (data.results || []);  //Results
      })
      // .catch(function() {
      // If request fails, clear results
      //   self.movies = [];
      // })
      ;
}

// Load today's trending movies
loadTrending() {
  var self = this;

  fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + environment.tmdbApiKey)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      self.movies = (data.results || []).slice(0, 5);
    })
    .catch(function() {
      self.movies = [];
    });
}

// Build full image URL for movie poster
getImage(path: string) {
  return 'https://image.tmdb.org/t/p/w200' + path;
}



}
