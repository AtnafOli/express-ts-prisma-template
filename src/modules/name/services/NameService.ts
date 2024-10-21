import { db } from '../../../utils/db.server';
import { CreateName, UpdateName } from '../types/NameTypes';

export class NameService {
  async create(data: CreateName) {
    return db.name.create({ data });
  }

  async findAll() {
    return db.name.findMany();
  }

  async findOne(id: number) {
    return db.name.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateName) {
    return db.name.update({ where: { id }, data });
  }

  async delete(id: number) {
    return db.name.delete({ where: { id } });
  }
}
