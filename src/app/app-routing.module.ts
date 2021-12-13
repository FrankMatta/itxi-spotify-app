import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsSearchComponent } from './artists-search/artists-search.component';
import { ForbiddenAccessComponent } from './forbidden-access/forbidden-access.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { SigninSpotifyComponent } from './signin-spotify/signin-spotify.component';


const routes: Routes =  [
  { path: '', component: ArtistsSearchComponent },
  { path: 'signin', component: SigninSpotifyComponent },
  { path: 'albums', canActivate : [AuthGuard] , component: AlbumsComponent },
  { path: 'forbidden', canActivate : [AuthGuard] , component: ForbiddenAccessComponent },
  { path: '**', component: PageNotFoundComponent },
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
