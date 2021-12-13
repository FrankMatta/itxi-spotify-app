import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Artist } from '../models/artist.model';
import { Artists } from '../models/artists.model';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-artists-search',
  templateUrl: './artists-search.component.html',
  styleUrls: ['./artists-search.component.css'],
})
export class ArtistsSearchComponent implements OnInit {
  artists: Artist[];
  defaultImageSource: string = 'assets/images/spotify-logo-with-text.jpg';
  isError = false;
  errorMessage: string;
  previousUrl: string;
  currentUrl: string;
  jazra : string = '';

  @ViewChild('userSearchInput') userSearchInput : ElementRef;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.spotifyService.getAccessToken();
    
  }

  getArtists(): void {
    this.clearError();
    const userInput = this.userSearchInput.nativeElement.value;

    this.spotifyService
      .getArtists(userInput)
      .subscribe(({ artists }: Artists) => {
        console.log(artists);
        if (artists.total <= 0) {
          this.showError('No result matched your search');
        }
        this.artists = artists.items;
      });
  }

  test(event: Event) {
    const userInput = (event.target as HTMLInputElement).value.trim();
  }

  clearError(): void {
    this.isError = false;
    this.errorMessage = '';
  }

  showError(message: string): void {
    this.isError = true;
    this.errorMessage = message;
  }

  getRating(popularity) {
    let rating = Math.ceil(popularity * 5 /100);

    if(rating === 0) {
      rating = 1;
    }

    return Array(rating);
  }
}
