import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Album } from './album.entity';  

@Injectable()
export class AlbumService {
  private albums: Album[] = [];


  findAll(): Album[] {
    return this.albums;
  }


  findOne(id: string): Album {
    const album = this.albums.find(album => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

 
  create(title: string, artistId: string, releaseDate: string): Album {
    const newAlbum = { id: Date.now().toString(), title, artistId, releaseDate };
    this.albums.push(newAlbum);
    return newAlbum;
  }

 
  update(id: string, title: string, artistId: string, releaseDate: string): Album {
    const album = this.findOne(id);
    album.title = title;
    album.artistId = artistId;
    album.releaseDate = releaseDate;
    return album;
  }

  
  remove(id: string): void {
    const index = this.albums.findIndex(album => album.id === id);
    if (index === -1) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    this.albums.splice(index, 1);
  }
}
