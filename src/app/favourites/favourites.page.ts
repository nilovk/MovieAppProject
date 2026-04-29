import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonItem, IonList, IonLabel, IonIcon  } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';



@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonItem, IonIcon, IonList, 
    RouterLink, CommonModule, IonLabel, ]
})
export class FavouritesPage implements OnInit {


  movies: any[] = [];

  constructor(private router: Router) {
    addIcons({ home, heart });
  }

  ngOnInit() {
    this.loadFavourites();
  }

  ionViewWillEnter() {
    this.loadFavourites();
  }

  loadFavourites() {
    var data = localStorage.getItem('favourites');
    this.movies = data ? JSON.parse(data) : [];
  }

  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }

  openDetails(id: number) {
    this.router.navigate(['/movie-details', id]);
  }
}