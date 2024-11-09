import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @HttpCode(200)
  getAllTracks(): Track[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  getTrackById(@Param('id') id: string): Track {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid trackId, should be a valid UUID');
    }
    const track = this.trackService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @Post()
  @HttpCode(201)
  createTrack(@Body() createTrackDto: CreateTrackDto): Track {
    if (!createTrackDto.title || !createTrackDto.artist) {
      throw new BadRequestException('Request body must contain title and artist fields');
    }
    return this.trackService.create(createTrackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto): Track {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid trackId, should be a valid UUID');
    }
    const updatedTrack = this.trackService.update(id, updateTrackDto);
    if (!updatedTrack) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string): void {
    if (!this.isValidUUID(id)) {
      throw new BadRequestException('Invalid trackId, should be a valid UUID');
    }
    const success = this.trackService.delete(id);
    if (!success) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
  }

  private isValidUUID(id: string): boolean {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return regex.test(id);
  }
}
