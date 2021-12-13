import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSpotifyComponent } from './signin-spotify/signin-spotify.component';
import { ArtistsSearchComponent } from './artists-search/artists-search.component';
import { HeaderComponent } from './shared/header/header.component';
import { AlbumsComponent } from './albums/albums.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SigninSpotifyComponent,
    ArtistsSearchComponent,
    HeaderComponent,
    AlbumsComponent,
    PageNotFoundComponent,
    ForbiddenAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
