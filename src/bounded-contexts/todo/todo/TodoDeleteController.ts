import { FastifyRequest, FastifyReply } from 'fastify';
import { BaseFastifyController } from '../../../shared/infra/rest/fastify/models/BaseFastifyController';

export class TodoDeleteController extends BaseFastifyController {
  constructor() {
    super();
  }
  async executeImpl(request: FastifyRequest, response: FastifyReply): Promise<void> {
    this.ok(response, 'Hello World!');
  }
}
