import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { DeleteCatDto } from './dto/delete-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CatsService {
  constructor(
    @Inject('CAT_MODEL')
    private catModel: Model<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }
  
  async delete(id: string): Promise<Cat> {
    const deletedCat = await this.catModel.findOneAndDelete({ _id: id }).exec();
    return deletedCat;
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, { new: true });
    if (!updatedCat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return updatedCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catModel.findById(id).exec();
  }
}
