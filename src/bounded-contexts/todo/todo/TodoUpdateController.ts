import { Fastify } from '@bitloops/bl-boilerplate-infra-rest-fastify';

export class TodoUpdateController extends Fastify.BaseController {
  constructor() {
    super();
  }
  async executeImpl(request: Fastify.Request, response: Fastify.Reply): Promise<void> {
    this.ok(response, 'Hello World!');
  }
}
