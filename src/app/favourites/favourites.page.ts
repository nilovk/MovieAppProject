import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonButtons, IonItem, IonList, IonLabel, IonIcon  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { Data } from '../services/data';



@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, 
    RouterLink, CommonModule, IonCard, IonCardContent, IonCardTitle, IonCardHeader, ]
})
export class FavouritesPage implements OnInit {


  // Stores favourite movies list
  movies: any[] = []; 

  // Inject services for routing and data storage
  constructor(private router: Router, private ds: Data) {
    addIcons({ home, heart }); // Register icons for use
  }

  // Runs automatically when page loads
  ngOnInit() {
    this.loadFavourites();
  }

   // Runs every time page becomes active
  ionViewWillEnter() {
    this.loadFavourites();
  }

   // Load favourites from storage
    async loadFavourites() {
    let data = await this.ds.get('favourites');
    // If data exists, use it; otherwise use empty array
    this.movies = data ? data : [];
  }

  // Build full image URL for movie poster
  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }

  // Navigate to movie details page with selected ID
  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}