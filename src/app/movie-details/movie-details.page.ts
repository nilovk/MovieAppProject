import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink,]
})
export class MovieDetailsPage implements OnInit {


  movie: any;
  cast: any[] = [];
  favourites: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit() {

    var self = this;
    var id = this.route.snapshot.paramMap.get('id');

    // Movie details
    fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + environment.tmdbApiKey)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        self.movie = data;
      });

    // Cast
    fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + environment.tmdbApiKey)
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        self.cast = (data.cast || []).slice(0, 6);
      });

    // favourites load
    var data = localStorage.getItem('favourites');
    this.favourites = data ? JSON.parse(data) : [];
  }

  getImage(path: string) {
    return 'https://image.tmdb.org/t/p/w200' + path;
  }

  isFavourite() {

  if (!this.movie) return false;

  var id = this.movie.id;

  return this.favourites.find(function(m) {
    return m.id == id;
  });
}

  addFavourite() {

  if (!this.isFavourite()) {
    this.favourites.push(this.movie);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

}

  removeFavourite() {

  var id = this.movie.id;

  this.favourites = this.favourites.filter(function(m) {
    return m.id != id;
  });

  localStorage.setItem('favourites', JSON.stringify(this.favourites));
}

openPerson(id: number) {
  this.router.navigate(['/details', id]);
}
}