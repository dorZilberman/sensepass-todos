import { Schema, Document } from 'mongoose';

export interface Todo extends Document {
    id: string;
    title: string;
    isCompleted: boolean;
}

export const TodoSchema = new Schema<Todo>(
    {
        title: { type: String, required: true },
        isCompleted: { type: Boolean, default: false },
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);