import { DataSource } from 'typeorm';
import { dataBaseConfig } from './data-base-config';

const AppDataSource = new DataSource(dataBaseConfig);

export default AppDataSource;
