import { Module } from '@nestjs/common';
import { EpisodiosService } from './episodios.service';
import { EpisodiosController } from './episodios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episodio } from './entities/episodio.entity';
import { Series } from '../series/entities/series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Episodio, Series])],
  controllers: [EpisodiosController],
  providers: [EpisodiosService],
})
export class EpisodiosModule { }
