import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/album.entity';


import { Artist } from 'src/artist/artist.entity';
import { Track } from 'src/track/track.entity'; // Assuming Track is defined

@Injectable()
export class FavoritesService {
  private favoriteArtists: Artist[] = [];
  private favoriteAlbums: Album[] = [];
  private favoriteTracks: Track[] = [];

  getAllFavorites() {
    return {
      artists: this.favoriteArtists,
      albums: this.favoriteAlbums,
      tracks: this.favoriteTracks,
    };
  }

  // Add track to favorites
  addTrackToFavorites(trackId: string): Track | null {
    const track = this.findTrackById(trackId);
    if (!track) return null;
    if (!this.favoriteTracks.find(t => t.id === trackId)) {
      this.favoriteTracks.push(track);
      return track;
    }
    return null;
  }

  // Remove track from favorites
  removeTrackFromFavorites(trackId: string): boolean {
    const index = this.favoriteTracks.findIndex(t => t.id === trackId);
    if (index === -1) return false;
    this.favoriteTracks.splice(index, 1);
    return true;
  }

  // Add album to favorites
  addAlbumToFavorites(albumId: string): Album | null {
    const album = this.findAlbumById(albumId);
    if (!album) return null;
    if (!this.favoriteAlbums.find(a => a.id === albumId)) {
      this.favoriteAlbums.push(album);
      return album;
    }
    return null;
  }

  // Remove album from favorites
  removeAlbumFromFavorites(albumId: string): boolean {
    const index = this.favoriteAlbums.findIndex(a => a.id === albumId);
    if (index === -1) return false;
    this.favoriteAlbums.splice(index, 1);
    return true;
  }

  // Add artist to favorites
  addArtistToFavorites(artistId: string): Artist | null {
    const artist = this.findArtistById(artistId);
    if (!artist) return null;
    if (!this.favoriteArtists.find(a => a.id === artistId)) {
      this.favoriteArtists.push(artist);
      return artist;
    }
    return null;
  }

  // Remove artist from favorites
  removeArtistFromFavorites(artistId: string): boolean {
    const index = this.favoriteArtists.findIndex(a => a.id === artistId);
    if (index === -1) return false;
    this.favoriteArtists.splice(index, 1);
    return true;
  }

  // Find methods (for future DB integration)
  private findTrackById(trackId: string): Track | null {
    return this.mockTracks.find(track => track.id === trackId) || null;
  }

  private findAlbumById(albumId: string): Album | null {
    return this.mockAlbums.find(album => album.id === albumId) || null;
  }

  private findArtistById(artistId: string): Artist | null {
    return this.mockArtists.find(artist => artist.id === artistId) || null;
  }

  // Mock data for demonstration
  private mockTracks: Track[] = [{ id: 'track1', name: 'Track 1', genre: 'Pop' }];
  private mockAlbums: Album[] = [{ id: 'album1', name: 'Album 1' }];
  private mockArtists: Artist[] = [{ id: 'artist1', name: 'Artist 1', genre: 'Rock' }];
}
