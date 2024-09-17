import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Education } from './entity';
import { EducationDto } from './dto';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(Education)
    private educationRepository: Repository<Education>,
  ) {}

  findAll(): Promise<Education[]> {
    return this.educationRepository.find();
  }

  findById(id: string): Promise<Education> {
    return this.educationRepository.findOne({ where: { id } });
  }

  findByQuery(filter: string, query: string): Promise<Education[]> {
    return this.educationRepository.find({ where: { [filter]: query } });
  }

  findOneByQuery(query: EducationDto): Promise<Education> {
    return this.educationRepository.findOne({
      where: { degree: query.degree, facilityName: query.facilityName },
    });
  }

  async create(body: EducationDto): Promise<Education> {
    return this.educationRepository.save(body);
  }

  async updateById(id: string, body: EducationDto): Promise<Education> {
    await this.educationRepository.update(id, body);
    return this.findById(id);
  }

  async delete(id: string): Promise<null> {
    await this.educationRepository.delete(id);
    return null;
  }
}
