import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
  })
export class AppService {
    spotify_access_token : string;
    spotify_refresh_token : string;
    code : string;

    constructor(private router : Router){}

    setAccessTokens(access_token : string, refresh_token : string) : void {
        this.spotify_access_token = access_token;
        this.spotify_refresh_token = refresh_token;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
    }
    
    logout() : void {
        this.clearStorage();
        this.router.navigate(['signin']);
    }

    clearStorage() : void {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('code');
    }
}