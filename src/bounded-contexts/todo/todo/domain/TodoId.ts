import { Domain, Either } from '@bitloops/bl-boilerplate-core';

export class TodoId extends Domain.Entity<any> {
  get id(): Domain.UniqueEntityID {
    return this._id;
  }

  private constructor(id?: Domain.UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: Domain.UniqueEntityID): Either<TodoId, never> {
    return Result.ok<TodoId>(new TodoId(id));
  }
}
