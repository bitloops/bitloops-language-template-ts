// import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
// import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';
// import { Result, Either, left, right } from '../../../../shared/core/Result';
import { Domain, Either, ok, fail } from '@bitloops/bl-boilerplate-core';
import { Title } from './Title';
import { DomainErrors } from './DomainErrors';
import { TodoId } from './TodoId';

export type UpdateTitleResult = Either<void, DomainErrors.InvalidTitleError>;

export interface TodoProps {
  todoId?: TodoId;
  title: Title;
}

export class Todo extends Domain.Aggregate<TodoProps> {
  get todoId(): TodoId {
    return TodoId.create(this._id).value;
  }

  get title(): Title {
    return this.props.title;
  }

  public updateTitle(title: string): UpdateTitleResult {
    const titleVO = Title.create({ title: title });
    if (titleVO.isFail()) {
      return fail(new DomainErrors.InvalidTitleError());
    }

    this.props.title = titleVO.value;
    return ok();
  }

  public static create(props: TodoProps): Either<Todo, never> {
    const todo = new Todo(props);

    return ok(todo);
  }
}
