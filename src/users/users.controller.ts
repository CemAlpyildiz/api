import { Body, Controller, Get, Param, Delete, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import { User as UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    createUserDto.password = await bcrypt.hash(createUserDto.password,saltOrRounds);
    
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Supprimer un user via un ID' })
  @ApiResponse({ status: 200, description: 'L user a bien été supprimé !' })
  @ApiResponse({ status: 404, description: 'L user n a pas été trouvé' })
  @Delete(':id')
  async delete(@Param() deleteUserDto: DeleteUserDto): Promise<User> {
    return this.usersService.delete(deleteUserDto.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier l utilisateur via un ID' })
  @ApiResponse({ status: 200, description: 'L utilisateur a été modifé avec succès.' })
  @ApiResponse({ status: 404, description: 'L utilisateur n a pas été trouvé.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: UserEntity,
  })

  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }
}
