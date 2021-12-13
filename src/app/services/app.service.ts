import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root",
  })
export class AppService {
    spotify_access_token : string;

    constructor(private router : Router){}

    setAccessTokens(access_token : string) : void {
        this.spotify_access_token = access_token;
        localStorage.setItem('access_token', access_token);
    }
    
    logout() : void {
        this.clearStorage();
        this.router.navigate(['signin']);
    }

    clearStorage() : void {
        localStorage.removeItem('access_token');
    }
}