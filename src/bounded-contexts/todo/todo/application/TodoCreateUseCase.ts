import { Application, Either } from '@bitloops/bl-boilerplate-core';

import { TodoCreateRequestDTO } from '../dtos/TodoCreateRequestDTO';
import { Todo } from '../domain/Todo';
import { Title } from '../domain/Title';
import { DomainErrors } from '../domain/DomainErrors';
import { ITodoRepo } from '../repos/ITodoRepo';

type TodoCreateResponse = Either<void, DomainErrors.InvalidTitleError>;

export class TodoCreateUseCase
  implements Application.IUseCase<TodoCreateRequestDTO, Promise<TodoCreateResponse>>
{
  private todoRepo: ITodoRepo;

  constructor(todoRepo: ITodoRepo) {
    this.todoRepo = todoRepo;
  }

  async execute(request: TodoCreateRequestDTO): Promise<TodoCreateResponse> {
    const titleVO = Title.create({ title: request.title });
    if (titleVO.isFail()) {
      return oops(new DomainErrors.InvalidTitleError());
    }
    const todo = new Todo({ title: titleVO.value });
    this.todoRepo.save(todo);
    return yay();
  }
}
