import { Injectable } from '@nestjs/common';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Series } from './entities/series.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeriesService {

  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
  ) { }

  async create(createSeriesDto: CreateSeriesDto) {
    const series = this.seriesRepository.create(createSeriesDto);
    return await this.seriesRepository.save(series);
  }

  async findAll(): Promise<Series[]> {
    return await this.seriesRepository.find({
      relations: ['episodios']
    });
  }

  async findOne(id: number): Promise<Series> {
    const series = await this.seriesRepository.findOne({
      where: { id },
      relations: ['episodios'],
    });
    if (!series) {
      throw new Error('Serie no encontrada');
    }
    return series;
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto): Promise<Series> {
    const serie = await this.findOne(id);

    Object.assign(serie, updateSeriesDto);
    return this.seriesRepository.save(serie);
  }

  async remove(id: number): Promise<Series> {
    const serie = await this.findOne(id);
    return await this.seriesRepository.remove(serie);
  }
}
