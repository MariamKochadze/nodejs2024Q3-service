import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  title?: string;

  @IsString()
  artist?: string;
}
