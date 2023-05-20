import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './todo.model';
import { AppGateway } from '../socket/socket/app.gateway';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>,
    private socketService: AppGateway) { }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async create(todo: Todo): Promise<Todo> {
    const createdTodo = new this.todoModel(todo);
    await createdTodo.save();

    const { id, title, isCompleted } = createdTodo;
    const message = {
      event: 'todoCreated',
      data: { id, title, isCompleted },
    };

    this.socketService.broadcastMessage(message);

    return createdTodo;
  }

  async update(id: string, todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
    });

    const { title, isCompleted } = updatedTodo;
    const message = {
      event: 'todoUpdated',
      data: { id, title, isCompleted },
    };

    this.socketService.broadcastMessage(message);

    return updatedTodo;
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);

    const message = {
      event: 'todoDeleted',
      data: { id },
    };

    this.socketService.broadcastMessage(message);

    return deletedTodo;
  }
}