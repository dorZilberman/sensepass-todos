import { Todo } from "../todo/todo.model";

export interface TodoMessage {
    event: string;
    data: Todo;
}