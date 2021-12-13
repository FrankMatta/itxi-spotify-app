import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-signin-spotify',
  templateUrl: './signin-spotify.component.html',
  styleUrls: ['./signin-spotify.component.css']
})
export class SigninSpotifyComponent implements OnInit {

  constructor(private spotifyService : SpotifyService, private appService: AppService){}

  ngOnInit() {
    this.appService.clearStorage();
  }

  redirectToShopify() {
    const url: string = this.spotifyService.createAuthorizeURL();
    console.log(url)
    window.location.href = url;
  }

}
