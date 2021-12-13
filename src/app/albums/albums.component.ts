import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums : Album[];
  defaultImageSource : string = "assets/images/spotify-logo-with-text.jpg";
  artistName : string;

  constructor(private spotifyService : SpotifyService) { }

  ngOnInit(): void {
    this.spotifyService.getAlbums().subscribe((data: any) => {
      this.albums = data.items;
      this.artistName = data.items[0].artists[0].name;
    })
  }

}
