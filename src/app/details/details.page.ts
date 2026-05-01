import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItemDivider,
  IonList, IonItem, IonLabel, IonIcon, IonButtons
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
import { MyHttp } from '../services/my-http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButton, IonLabel, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItemDivider,
    IonItem, IonIcon, IonButtons, RouterLink]
})
export class DetailsPage implements OnInit {


  person: any;
  movies: any[] = [];

  // Inject services for routing, MyHTTP requests
  constructor(private route: ActivatedRoute, private mhs: MyHttp) {
    addIcons({ home, heart }); // Register icons for use
  }

  // Runs automatically when page loads
  async ngOnInit() {

    // Get person ID from URL parameter
    let id = this.route.snapshot.paramMap.get('id');

    // Person details
    let personOptions = {
      url: `https://api.themoviedb.org/3/person/${id}`,
      params: {
        api_key: environment.tmdbApiKey
      }
    };

    // Store person data
    let personResult = await this.mhs.get(personOptions);
    this.person = personResult.data;
    //console.log(personResult.data);

    // Known for movies
    let moviesOptions = {
      url: `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      params: {
        api_key: environment.tmdbApiKey
      }
    };

    // Store movies
    let moviesResult = await this.mhs.get(moviesOptions);
    this.movies = (moviesResult.data.cast);
    //console.log(moviesResult.data.cast);
  }

  // Build full image URL for movie poster
  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }
}