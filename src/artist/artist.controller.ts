import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Get all artists
  @Get()
  getAllArtists(): Artist[] {
    return this.artistService.findAll();
  }

  // Get single artist by id
  @Get(':id')
  getArtistById(@Param('id') id: string): Artist {
    return this.artistService.findOne(id);
  }

  // Create a new artist
  @Post()
  @HttpCode(201)
  createArtist(@Body() body: { name: string, genre: string }): Artist {
    const { name, genre } = body;
    return this.artistService.create(name, genre);
  }

  // Update artist by id
  @Put(':id')
  updateArtist(@Param('id') id: string, @Body() body: { name: string, genre: string }): Artist {
    const { name, genre } = body;
    return this.artistService.update(id, name, genre);
  }

  // Delete artist by id
  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string): void {
    this.artistService.remove(id);
  }
}
