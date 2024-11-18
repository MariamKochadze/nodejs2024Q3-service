import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

import { UserEntity } from '../modules/user/entities/user.entity';
import { ArtistEntity } from '../modules/artist/entities/artist.entity';
import { AlbumEntity } from '../modules/album/entities/album.entity';
import { TrackEntity } from '../modules/track/entities/track.entity';
import { FavoriteEntity } from '../modules/favs/entities/favs.entity';
import { Migration1731760974679 } from './migrations/1731760974679-Migration';

const { DB_HOST, DB_HOST_DOCKER, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } =
  process.env;
const url = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST_DOCKER}:${DB_PORT}/${DB_NAME}`;

export const dataBaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  url,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavoriteEntity,
  ],
  synchronize: false,
  logging: true,
  migrations: [Migration1731760974679],
  migrationsRun: true,
};
