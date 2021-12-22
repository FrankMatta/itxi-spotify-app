import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { catchError, map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Artists } from '../models/artists.model';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService implements OnInit {
  CLIENT_ID: string = environment.CLIENT_ID;
  CLIENT_SECRET: string = environment.CLIENT_SECRET;
  SPOTIFY_AUTHORIZE_URL: string = environment.SPOTIFY_AUTHORIZE_URL;
  SPOTIFY_TOKEN_URL: string = environment.SPOTIFY_TOKEN_URL;
  authToken: string;
  authHeader: HttpHeaders;
  SCOPES: string[] = ['user-read-email', 'user-read-private'];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.setPayload();
  }

  createAuthorizeURL() {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: `${window.location.origin}`,
      scope: encodeURIComponent(this.SCOPES.join(' ')),
      state: "uSt@R@NdomstrINg",
      response_type: 'token',
      show_dialog: 'true'
    });
    return `${this.SPOTIFY_AUTHORIZE_URL}?${params.toString()}`;
  }

  setPayload() {
    const access_token : string = localStorage.getItem('access_token');
    this.authToken = 'Bearer ' + access_token;
    this.authHeader = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-type', 'application/json');
  }

  getAccessToken(): void {
    if(localStorage.getItem('access_token')) {
      return;
    }
    
    const fragment = this.activatedRoute.snapshot.fragment;

    if(!fragment) {
      this.appService.logout();
      return;
    }

    const parts = fragment.split('&');

    const params : any = parts.reduce((map, part) => {
        const pieces = part.split('=');
        map[pieces[0]] = pieces[1];
        return map;
    }, {});

    //this means the user could not be authenticated
    if (params.error) {
      this.appService.logout();
      return;
    }

    localStorage.setItem('access_token', params.access_token);

  }

  getArtists(name: string) {
    this.setPayload();

    return this.httpClient
      .get('https://api.spotify.com/v1/search', {
        params: {
          q: name,
          type: 'artist',
          include_external: 'audio',
        },
        headers: this.authHeader,
      })
      .pipe(
        map(
          (data) => {
            return data;
          },
          (error) => {
            return error;
          }
        )
      );
  }


  getAlbums() {
    this.setPayload();

    const artistId: string = this.activatedRoute.snapshot.queryParams.id;
    const url: string = `https://api.spotify.com/v1/artists/${artistId}/albums`;

    return this.httpClient.get(url, { headers: this.authHeader }).pipe(
      map(
        (data) => {
          return data;
        },
        (error) => {
          return error;
        }
      )
    );
  }
}
