import { Injectable } from '@nestjs/common';
import { Track } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';  


@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track | undefined {
    return this.tracks.find((track) => track.id === id);
  }

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = { id: this.generateUUID(), ...createTrackDto };
    this.tracks.push(newTrack);
    return newTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track | null {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return null;

    const updatedTrack = { ...this.tracks[trackIndex], ...updateTrackDto };
    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  delete(id: string): boolean {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return false;

    this.tracks.splice(trackIndex, 1);
    return true;
  }

  private generateUUID(): string {
    return uuidv4();  
  }
}
