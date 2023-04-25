import { Body, Controller, Get, Param, Delete, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { DeleteCatDto } from './dto/delete-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { Cat as CatEntity } from './entities/cat.entity';

@ApiBearerAuth()
@ApiTags('cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @ApiOperation({ summary: 'Supprimer un chat via un ID' })
  @ApiResponse({ status: 200, description: 'Le chat a bien été supprimé !' })
  @ApiResponse({ status: 404, description: 'Le chat n a pas été trouvé' })
  @Delete(':id')
  async delete(@Param() deleteCatDto: DeleteCatDto): Promise<Cat> {
    return this.catsService.delete(deleteCatDto.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update cat by ID' })
  @ApiResponse({ status: 200, description: 'The cat has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Cat not found.' })
  async update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto): Promise<Cat> {
    return this.catsService.update(id, updateCatDto);
  }

  @Get()
  findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: CatEntity,
  })

  findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(+id);
  }
}
