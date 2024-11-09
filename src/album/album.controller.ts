import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}


  @Get()
  getAllAlbums(): Album[] {
    return this.albumService.findAll();
  }


  @Get(':id')
  getAlbumById(@Param('id') id: string): Album {
    return this.albumService.findOne(id);
  }


  @Post()
  @HttpCode(201)
  createAlbum(@Body() body: { title: string, artistId: string, releaseDate: string }): Album {
    const { title, artistId, releaseDate } = body;
    return this.albumService.create(title, artistId, releaseDate);
  }


  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() body: { title: string, artistId: string, releaseDate: string }): Album {
    const { title, artistId, releaseDate } = body;
    return this.albumService.update(id, title, artistId, releaseDate);
  }

 
  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string): void {
    this.albumService.remove(id);
  }
}
