import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonToolbar, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { MyHttp } from '../services/my-http';
import { Data } from '../services/data';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
    IonButton, IonButtons, RouterLink, IonIcon ]
})
export class MovieDetailsPage implements OnInit {


  movie: any;  // Stores selected movie details
  cast: any[] = []; // Stores movie cast list
  favourites: any[] = []; // Stores favourite movies

  // Inject services for routing, MyHTTP requests and data storage
  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttp, private ds: Data) {
    addIcons({ home, heart }); // Register icons for use
  }

  // Runs automatically when page loads
  async ngOnInit() {

    // Get movie ID from URL parameter
    let id = this.route.snapshot.paramMap.get('id');

    // Movie details from API
     let movieResult = await this.mhs.get({
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: {
        api_key: environment.tmdbApiKey
      }
    });

    // Store movie data
    this.movie = movieResult.data;

    // Cast details from API
    let castResult = await this.mhs.get({
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: {
        api_key: environment.tmdbApiKey
      }
    });

     // Store first 6 cast members
    this.cast = (castResult.data.cast);
    //console.log(castResult.data.cast);

    // Load favourites from local storage
    let data = await this.ds.get('favourites');
    this.favourites = data ? data : [];
  }

  // Build full image URL for movie poster
  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }

  // FAVOURITES LOGIC
  // Check if current movie is in favourites
  isFavourite() {
  // Loop through favourites and check if current movie exists in the list
  for (let i = 0; i < this.favourites.length; i++) {
    if (this.favourites[i].id == this.movie.id) {
      return true;
    }
  }

  // Movie not found in favourites
  return false;
}

   // Add movie to favourites
  async addFavourite() {
    if (!this.isFavourite()) {
      this.favourites.push(this.movie);
      await this.ds.set('favourites', this.favourites);
    }
  }

  // Remove movie from favourites 
  async removeFavourite() {
  // Create a new array to store updated favourites list
  let updated: any[] = [];

  // Loop through all favourites
  for (let i = 0; i < this.favourites.length; i++) {
    // Keep only movies that are NOT the current movie
    if (this.favourites[i].id != this.movie.id) {
      updated.push(this.favourites[i]);
    }
  }

  // Replace old favourites with updated list
  this.favourites = updated;

  // Save updated favourites list to storage
  await this.ds.set('favourites', this.favourites);
}

   // Redirect to person details page
  openPerson(id: number) {
    this.router.navigate(['/details', id]);
  }
}