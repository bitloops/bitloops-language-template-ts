import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { routes } from './routes';

const FASTIFY_REST_METHODS = {
  GET: 'GET',
  POST: 'POS',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const router = async (fastify: FastifyInstance) => {
  for (const route of routes) {
    const { method, url, controller } = route;
    switch (method) {
      case FASTIFY_REST_METHODS.GET:
        fastify.get(url, {}, async (req: FastifyRequest, reply: FastifyReply) => {
          return controller.execute(req, reply);
        });
        break;
      case FASTIFY_REST_METHODS.POST:
        fastify.post(url, {}, async (req: FastifyRequest, reply: FastifyReply) => {
          return controller.execute(req, reply);
        });
        break;
      case FASTIFY_REST_METHODS.PUT:
        fastify.put(url, {}, async (req: FastifyRequest, reply: FastifyReply) => {
          return controller.execute(req, reply);
        });
        break;
      case FASTIFY_REST_METHODS.DELETE:
        fastify.delete(url, {}, async (req: FastifyRequest, reply: FastifyReply) => {
          return controller.execute(req, reply);
        });
        break;
      default:
        throw new Error(`Unknown method ${method}`);
    }
  }
};

export default router;
