import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'migrate-mongo';
import { IEnvironment } from './enviroment.interface';
import { join } from 'path';

@Injectable()
export class DbMigrationService implements OnModuleInit {
  private readonly dbMigrationConfig: config.Config;

  constructor(private readonly configService: ConfigService<IEnvironment>) {
    this.dbMigrationConfig = {
      mongodb: {
        url: this.configService.getOrThrow<string>('mongoUri'),
        databaseName: this.configService.getOrThrow('db_name'),
      },

      migrationsDir: join(process.cwd(), 'src', 'migrations'),
      changelogCollectionName: 'changelog',
      migrationFileExtension: '.js',
    };
  }
  async onModuleInit() {
    const { config, database, up } = await import('migrate-mongo');
    config.set(this.dbMigrationConfig);
    const { db, client } = await database.connect();
    await up(db, client);
  }
}
