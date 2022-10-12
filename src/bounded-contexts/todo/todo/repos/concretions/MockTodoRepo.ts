// import { ITodoRepo } from '../ITodoRepo';
import { Application } from '@bitloops/bl-boilerplate-core';
import { Todo } from '../../domain/Todo';
// import { TodoId } from '../../domain/TodoId';

export class MockTodoRepo implements Application.Repo.ICRUDPort<Todo> {
  async exists(todoId: typeof Todo.todoId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAllTodos(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }

  async getTodoById(todoId: typeof Todo.todoId): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  async delete(todoId: typeof Todo.todoId): Promise<void> {
    console.log('Deleting todo', todoId);
  }

  async save(todo: Todo): Promise<void> {
    console.log('Saving todo', todo);
  }
}
