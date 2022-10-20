import { GraphQL } from '@bitloops/bl-boilerplate-infra-graphql';

type TodoGetAllResponseDTO = {
  todos: any[];
};

export class TodoGetAllGQLController extends GraphQL.BaseController<
  GraphQL.TRequest<void>,
  TodoGetAllResponseDTO
> {
  constructor() {
    super();
  }
  async executeImpl(request: GraphQL.TRequest<void>): Promise<TodoGetAllResponseDTO> {
    // const { args } = request;
    return this.ok({ todos: ['Hello World!'] });
  }
}
