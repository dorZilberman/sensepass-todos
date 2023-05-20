import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Todo } from 'src/app/models/todo/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnChanges {
  @Input() todo!: Todo;
  @Output() onTodoDeletion: EventEmitter<string>;
  @Output() onToggleComplete: EventEmitter<{ id: string, isCompleted: boolean }>;
  @Output() onUpdateTitle: EventEmitter<{ id: string, newTitle: string }>;

  public id!: string;
  public title!: string;
  public isCompleted!: boolean;

  public editMode: boolean;
  public editedTitle: string;

  constructor() {
    this.onTodoDeletion = new EventEmitter<string>();
    this.onToggleComplete = new EventEmitter<{ id: string, isCompleted: boolean }>();
    this.onUpdateTitle = new EventEmitter<{ id: string, newTitle: string }>();
    this.editMode = false;
    this.editedTitle = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes");
    console.log(changes['todo'].currentValue);
    const todo: any = changes['todo'].currentValue;
    this.id = todo.id;
    this.title = todo.title;
    this.isCompleted = todo.isCompleted;
  }

  delete() {
    console.log("sending delete from todo with id:   " + this.id + "   and title    " + this.title);
    this.onTodoDeletion.emit(this.id);
  }

  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
    this.onToggleComplete.emit({ id: this.id, isCompleted: this.isCompleted });
  }

  enterEditMode(): void {
    this.editMode = true;
    this.editedTitle = this.todo.title;
  }

  saveEdit(): void {
    console.log("this.editedTitle");
    console.log(this.editedTitle);
    this.title = this.editedTitle;
    this.editMode = false;
    this.onUpdateTitle.emit({id: this.id, newTitle: this.title});
  }

  cancelEdit(): void {
    this.editMode = false;
  }
}
