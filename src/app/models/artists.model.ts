import { Artist } from './artist.model';

export interface Artists {
  artists: {
    href: string;
    items: Artist[];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
  };
}
