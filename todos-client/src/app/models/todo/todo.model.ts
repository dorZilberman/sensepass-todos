export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface createTodoDto {
    title: string;
    isCompleted: boolean;
}

export interface updateTodoDto {
    id: string;
    title?: string;
    isCompleted?: boolean;
}