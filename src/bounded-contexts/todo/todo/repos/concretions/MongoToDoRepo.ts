import { Application } from '@bitloops/bl-boilerplate-core';
import { Mongo } from '@bitloops/bl-boilerplate-infra-mongo';
import { Todo } from '../../domain/Todo';
import { TodoId } from '../../domain/TodoId';

const DB_NAME = process.env.MONGO_DB_DATABASE || 'todo';
const COLLECTION_NAME = process.env.MONGO_DB_TODO_COLLECTION || 'todos';

export class MongoTodoRepo implements Application.Repo.ICRUDPort<Todo, TodoId> {
  private collectionName = COLLECTION_NAME;
  private dbName = DB_NAME;
  private collection: any;

  constructor(private client: Mongo.Client) {
    this.collection = this.client.db(this.dbName).collection(this.collectionName);
  }
  async exists(todoId: TodoId): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<Todo[]> {
    // const collection = this.client.db(this.dbName).collection(this.collection);
    // return await collection.find({});
    throw new Error('Method not implemented.');
  }

  async getById(todoId: TodoId): Promise<Todo> {
    // const collection = this.client.db(this.dbName).collection(this.collection);
    // return await this.collection.fin;
    throw new Error('Method not implemented.');
  }

  async delete(todoId: TodoId): Promise<void> {
    console.log('Deleting todo', todoId);
  }

  async save(todo: Todo): Promise<void> {
    await this.collection.insertOne({
      _id: todo.id.toString(),
      title: todo.title.title,
    });
  }

  async update(todo: Todo): Promise<void> {
    console.log('Updating todo', todo);
  }
}
