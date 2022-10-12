// import { ITodoRepo } from '../ITodoRepo';
import { Application } from '@bitloops/bl-boilerplate-core';
import { Todo } from '../../domain/Todo';
import { TodoId } from '../../domain/TodoId';

export class MockTodoRepo implements Application.Repo.ICRUDPort<Todo, TodoId> {
  async exists(todoId: TodoId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }

  async getById(todoId: TodoId): Promise<Todo> {
    throw new Error('Method not implemented.');
  }

  async delete(todoId: TodoId): Promise<void> {
    console.log('Deleting todo', todoId);
  }

  async save(todo: Todo): Promise<void> {
    console.log('Saving todo', todo);
  }

  async update(todo: Todo): Promise<void> {
    console.log('Updating todo', todo);
  }
}
