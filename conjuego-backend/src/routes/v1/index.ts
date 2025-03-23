import { FastifyInstance } from 'fastify';
import { problemRoutes } from './problem';

export async function registerV1Routes(fastify: FastifyInstance) {
  await fastify.register(problemRoutes);
}
