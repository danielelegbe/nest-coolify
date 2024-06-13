import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: Prisma.PostCreateInput) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.postsService.findOne(id);
    if (!user) {
      throw new NotFoundException(`Post #${id} not found`);
    }

    return user;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePostDto: Prisma.PostUpdateInput,
  ) {
    const user = this.postsService.update(id, updatePostDto);

    if (!user) {
      throw new NotFoundException(`Post #${id} not found`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const user = this.postsService.remove(id);

    if (!user) {
      throw new NotFoundException(`Post #${id} not found`);
    }
  }
}
