import { Injectable } from '@nestjs/common';
import { CreateEpisodioDto } from './dto/create-episodio.dto';
import { UpdateEpisodioDto } from './dto/update-episodio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Episodio } from './entities/episodio.entity';
import { Repository } from 'typeorm';
import { Series } from '../series/entities/series.entity';

@Injectable()
export class EpisodiosService {

  constructor(
    @InjectRepository(Episodio)
    private readonly episodiosRepository: Repository<Episodio>,

    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
  ) { }

  async create(createEpisodioDto: CreateEpisodioDto): Promise<Episodio> {
    const {
      serieId, ...episodioData
    } = createEpisodioDto;
    const serie = await this.seriesRepository.findOne({
      where: { id: serieId },
    });

    if (!serie) {
      throw new Error('Serie no encontrada');
    }

    const episodio = this.episodiosRepository.create({
      ...episodioData,
      serie,
    });

    return await this.episodiosRepository.save(episodio);

  }

  async findAll(): Promise<Episodio[]> {
    return await this.episodiosRepository.find({
      relations: ['serie']
    });
  }

  async findOne(id: number): Promise<Episodio> {
    const episodio = await this.episodiosRepository.findOne({
      where: { id },
      relations: ['serie']
    });
    if (!episodio) {
      throw new Error('Episodio no encontrado');
    }
    return episodio;
  }

  async update(id: number, updateEpisodioDto: UpdateEpisodioDto): Promise<Episodio> {
    const episodio = await this.findOne(id);
    Object.assign(episodio, updateEpisodioDto);
    return await this.episodiosRepository.save(episodio);
  }

  async remove(id: number) {
    const episodio = await this.findOne(id);
    return await this.episodiosRepository.softDelete(episodio);
  }
}
