import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = await this.studentsRepository.create(createStudentDto);
    await this.studentsRepository.save(student);
    return student;
  }

  findAll() {
    try {
      return this.studentsRepository.find();
    } catch (error) {
      throw new Error('error when getting students');
    }
  }

  findOne(id: string) {
    return this.studentsRepository.findOneBy({ id });
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
