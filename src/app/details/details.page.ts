import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItemDivider, 
   IonList, IonItem, IonLabel, IonIcon, IonButtons } from '@ionic/angular/standalone';
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
     IonList, IonItem, IonIcon, IonButtons, RouterLink]
})
export class DetailsPage implements OnInit {


  person: any;
  movies: any[] = [];

  constructor(private route: ActivatedRoute, private mhs: MyHttp) {
    addIcons({ home, heart });
  }

  async ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    // Person details
    let personOptions = {
      url: `https://api.themoviedb.org/3/person/${id}`,
      params: {
        api_key: environment.tmdbApiKey
      }
    };

    let personResult = await this.mhs.get(personOptions);
    this.person = personResult.data;

    // Known for movies
    let moviesOptions = {
      url: `https://api.themoviedb.org/3/person/${id}/movie_credits`,
      params: {
        api_key: environment.tmdbApiKey
      }
    };

    let moviesResult = await this.mhs.get(moviesOptions);
    this.movies = (moviesResult.data.cast || []).slice(0, 5);
  }

  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }
}