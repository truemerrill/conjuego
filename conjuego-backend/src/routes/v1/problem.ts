import { FastifyInstance } from 'fastify';
import { ProblemModel } from '../../models/Problem';

export async function problemRoutes(fastify: FastifyInstance) {
  /**
   * Registers the GET /api/v1/problem/:id route.
   *
   * This route retrieves a single conjugation problem by its unique ID.
   * The route is protected by Auth0 JWT authentication and requires a valid
   * Bearer token in the Authorization header.
   *
   * Request:
   *   - Path param: `id` — The unique problem identifier (string)
   *   - Header: `Authorization: Bearer <token>`
   *
   * Response:
   *   - 200: Returns the problem document as JSON
   *   - 404: If the problem with the given ID is not found
   *   - 401: If the user is unauthorized
   *   - 500: On internal server error
   */
  fastify.get<{ Params: { id: string } }>('/api/v1/problem/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const problem = await ProblemModel.findOne({ id });
      if (!problem) {
        return reply.code(404).send({ error: 'Problem not found' });
      }

      return reply.send(problem);
    } catch (err) {
      request.log.error(err);
      return reply.code(500).send({ error: 'Internal server error' });
    }
  });
}
