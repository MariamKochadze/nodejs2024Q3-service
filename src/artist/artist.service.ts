import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Artist } from './artist.entity';  // Adjust if you are using a real DB

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  // Get all artists
  findAll(): Artist[] {
    return this.artists;
  }

  // Get artist by id
  findOne(id: string): Artist {
    const artist = this.artists.find(artist => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  // Create a new artist
  create(name: string, genre: string): Artist {
    const newArtist = { id: Date.now().toString(), name, genre };
    this.artists.push(newArtist);
    return newArtist;
  }

  // Update artist
  update(id: string, name: string, genre: string): Artist {
    const artist = this.findOne(id);
    artist.name = name;
    artist.genre = genre;
    return artist;
  }

  // Delete artist
  remove(id: string): void {
    const index = this.artists.findIndex(artist => artist.id === id);
    if (index === -1) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    this.artists.splice(index, 1);
  }
}
