import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket-service/socket.service';
import { TodoService } from '../../services/todo-service/todo.service';
import { Todo, createTodoDto, updateTodoDto } from '../../models/todo/todo.model';
import { TodoMessage } from 'src/app/models/todoMessage/todoMessage.model';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {

  public todos!: Todo[];
  public newTodoTitle: string;

  constructor(private todoService: TodoService, private socketService: SocketService) {
    this.socketService.initSocket();
    this.handleMessages();
    this.newTodoTitle = '';
  }

  public handleMessages() {
    this.socketService.onMessage().subscribe((message: TodoMessage) => {

      switch (message.event) {
        case 'todoCreated':
          this.addTodoToList(message.data)
          break;
        case 'todoUpdated':
          this.updateTodoOnList(message.data)
          break;
        case 'todoDeleted':
          this.removeTodoFromList(message.data)
          break;
        default:
          console.log("unhandled message");
          break;
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    this.todoService.getAllTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  public async createTodo(): Promise<void> {
    const newTodo: createTodoDto = {
      isCompleted: false,
      title: this.newTodoTitle
    }
    this.todoService.createTodo(newTodo).subscribe(() => {
      this.newTodoTitle = '';
    });
  }

  public addTodoToList(newTodo: Todo) {
    this.todos.push(newTodo);
  }

  public async updateTodo(data: { id: string, newTitle: string }): Promise<void> {
    const updatedTodo: updateTodoDto = {
      id: data.id,
      title: data.newTitle
    }
    this.todoService.updateTodo(updatedTodo).subscribe(() => { });
  }

  public updateTodoOnList(updatedTodo: Todo) {
    const todoIndex = this.todos.findIndex((todo) => { return todo.id === updatedTodo.id });
    if (todoIndex !== -1) {
      this.todos[todoIndex] = updatedTodo;
    }
  }

  public async deleteTodo(id: string): Promise<void> {
    this.todoService.deleteTodo(id).subscribe(() => { });
  }

  public removeTodoFromList(deletedTodo: Todo) {
    this.todos = this.todos.filter((todo) => { return todo.id !== deletedTodo.id });
  }

  toggleTodoComplete(data: { id: string, isCompleted: boolean }) { 
    const updatedTodo: updateTodoDto = {
      id: data.id,
      isCompleted: data.isCompleted
    }
    this.todoService.updateTodo(updatedTodo).subscribe(() => { });
  }
}
