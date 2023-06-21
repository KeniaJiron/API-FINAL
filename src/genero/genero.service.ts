import { Injectable } from '@nestjs/common';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { UpdateGeneroDto } from './dto/update-genero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async create(createGeneroDto: CreateGeneroDto) {
    const genero = await this.generoRepository.create(createGeneroDto);
    await this.generoRepository.save(genero);
    return genero;
  }

  findAll() {
    return this.generoRepository.find();
  }

  findOne(id: string) {
    return this.generoRepository.findOneBy({ id });
  }

  async update(id: string, updateGeneroDto: UpdateGeneroDto) {
    const getGener = await this.findOne(id);
    const updateGenero = await this.generoRepository.merge(
      getGener,
      updateGeneroDto,
    );
    return updateGenero;
  }

  async remove(id: string) {
    const genero = await this.generoRepository.findOneBy({ id });
    await this.generoRepository.remove(genero);
    return 'genero removed';
  }
}
