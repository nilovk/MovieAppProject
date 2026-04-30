import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonItemDivider, 
   IonList, IonItem, IonLabel, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { home, heart } from 'ionicons/icons';
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

  constructor(private route: ActivatedRoute) {
    addIcons({ home, heart });
  }

  ngOnInit() {

    var id = this.route.snapshot.paramMap.get('id');

    // Person details
    fetch('https://api.themoviedb.org/3/person/' + id + '?api_key=' + environment.tmdbApiKey)
      .then(res => res.json())
      .then(data => {
        this.person = data;
      });

    // Known for movies
    fetch('https://api.themoviedb.org/3/person/' + id + '/movie_credits?api_key=' + environment.tmdbApiKey)
      .then(res => res.json())
      .then(data => {
        this.movies = (data.cast || []).slice(0, 5);
      });
  }

  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }
}