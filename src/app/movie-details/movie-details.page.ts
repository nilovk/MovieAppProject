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


  movie: any;
  cast: any[] = [];
  favourites: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private mhs: MyHttp, private ds: Data) {
    addIcons({ home, heart });
  }

  async ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    // Movie details
     let movieResult = await this.mhs.get({
      url: `https://api.themoviedb.org/3/movie/${id}`,
      params: {
        api_key: environment.tmdbApiKey
      }
    });

    this.movie = movieResult.data;

    // Cast
    let castResult = await this.mhs.get({
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: {
        api_key: environment.tmdbApiKey
      }
    });

    this.cast = (castResult.data.cast || []).slice(0, 6);

    // favourites load
    let data = await this.ds.get('favourites');
    this.favourites = data ? data : [];
  }

  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }

  // FAVOURITES LOGIC
  isFavourite() {
    if (!this.movie) return false;

    return this.favourites.find(m => m.id == this.movie.id);
  }

  async addFavourite() {
    if (!this.isFavourite()) {
      this.favourites.push(this.movie);
      await this.ds.set('favourites', this.favourites);
    }
  }

   async removeFavourite() {
    this.favourites = this.favourites.filter(m => m.id != this.movie.id);
    await this.ds.set('favourites', this.favourites);
  }

  openPerson(id: number) {
    this.router.navigate(['/details', id]);
  }
}