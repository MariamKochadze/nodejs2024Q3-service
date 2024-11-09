import { Controller, Get, Post, Param, Delete, HttpCode, HttpStatus, BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ValidateUUIDPipe } from './validate-uuid.pipe';


@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllFavorites() {
    const favorites = await this.favoritesService.getAllFavorites();
    return favorites;
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavorites(
    @Param('id', ValidateUUIDPipe) trackId: string,
  ) {
    const track = await this.favoritesService.addTrackToFavorites(trackId);
    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }
    return { message: `Track with id ${trackId} added to favorites` };
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(
    @Param('id', ValidateUUIDPipe) trackId: string,
  ) {
    const result = await this.favoritesService.removeTrackFromFavorites(trackId);
    if (!result) {
      throw new NotFoundException('Track is not in favorites');
    }
    return;
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavorites(
    @Param('id', ValidateUUIDPipe) albumId: string,
  ) {
    const album = await this.favoritesService.addAlbumToFavorites(albumId);
    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }
    return { message: `Album with id ${albumId} added to favorites` };
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(
    @Param('id', ValidateUUIDPipe) albumId: string,
  ) {
    const result = await this.favoritesService.removeAlbumFromFavorites(albumId);
    if (!result) {
      throw new NotFoundException('Album is not in favorites');
    }
    return;
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavorites(
    @Param('id', ValidateUUIDPipe) artistId: string,
  ) {
    const artist = await this.favoritesService.addArtistToFavorites(artistId);
    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }
    return { message: `Artist with id ${artistId} added to favorites` };
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(
    @Param('id', ValidateUUIDPipe) artistId: string,
  ) {
    const result = await this.favoritesService.removeArtistFromFavorites(artistId);
    if (!result) {
      throw new NotFoundException('Artist is not in favorites');
    }
    return;
  }
}
