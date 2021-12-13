import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { map } from 'rxjs/operators';
import { TokenResponse } from '../models/token-response.model';
import { Subject } from 'rxjs/internal/Subject';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
      response_type: 'code'
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
    
    this.appService.code = this.activatedRoute.snapshot.queryParams.code;
    const code = this.appService.code;

    //this means the user could not be authenticated
    if (!code) {
      this.appService.logout();
      return;
    }

    //btoa to turn it into a buffer
    const bufferAuth: string =
      'Basic ' + btoa(this.CLIENT_ID + ':' + this.CLIENT_SECRET);

    const authHeader: HttpHeaders = new HttpHeaders()
      .set('Authorization', bufferAuth)
      .set('Content-type', 'application/x-www-form-urlencoded');

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', window.origin);

    //getting access token, on error the user will be redirected back to the login page
    this.httpClient
      .post<TokenResponse>(this.SPOTIFY_TOKEN_URL, body.toString(), {
        headers: authHeader,
      })
      .subscribe(
        (data) => {
          console.log('tokenz', data);
          this.appService.setAccessTokens(
            data.access_token,
            data.refresh_token
          );
        },
        (error) => {
          this.router.navigate(['signin']);
        }
      );
  }

  authorizeUser(){ // TODO make this return true or false for the guard
    this.setPayload();
    this.httpClient.get('https://api.spotify.com/v1/me', {headers: this.authHeader}).subscribe((userData) => {

    }, (error)=>{
      // this.router.navigate(['/forbidden']);
    })
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
