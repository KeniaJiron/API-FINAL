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
    return this.studentsRepository.find();
  }

  findOne(id: string) {
    return this.studentsRepository.findOneBy({ id });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const findStudent = await this.findOne(id);
    const UpdateStudent = await this.studentsRepository.merge(
      findStudent,
      updateStudentDto,
    );
    return this.studentsRepository.save(UpdateStudent);
  }

  async remove(id: string) {
    const students = await this.studentsRepository.findOneBy({ id });
    await this.studentsRepository.remove(students);
    return `students ${students.id} is removed`;
  }
}
