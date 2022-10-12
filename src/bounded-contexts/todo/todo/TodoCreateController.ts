import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseFastifyController } from '../../../shared/infra/rest/fastify/models/BaseFastifyController';
import { TextUtils } from '../../../shared/utils/TextUtils';
import { TodoCreateUseCase } from './DI';
import { DomainErrors } from './domain/DomainErrors';
import { TodoCreateRequestDTO } from './dtos/TodoCreateRequestDTO';

export class TodoCreateController extends BaseFastifyController {
  private useCase: TodoCreateUseCase;
  constructor(useCase: TodoCreateUseCase) {
    super();
    this.useCase = useCase;
  }
  async executeImpl(request: FastifyRequest, response: FastifyReply): Promise<void> {
    const dto: TodoCreateRequestDTO = {
      title: TextUtils.sanitize((request.body as any)?.title),
    };
    const result = await this.useCase.execute(dto);
    if (result.isFail()) {
      this.fail(response, (result.value as DomainErrors.InvalidTitleError).message);
    } else {
      this.ok(response);
    }
  }
}
