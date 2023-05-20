import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './socket/socket/socket.module';
import { TodoSchema } from './todo/todo.model';
import { TodosController } from './todo/todos.controller';
import { TodosService } from './todo/todos.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/todo-app'),
    MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }]),
    SocketModule
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class AppModule { }
