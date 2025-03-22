import Fastify from 'fastify';
import { Problem } from './types/problem';

// Database connection
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/conjuego";


// Load the mock problems
import fs from 'fs';
import path from 'path';

const problemsPath = path.join(__dirname, 'data', 'mockProblems.json');
const problems: Problem[] = JSON.parse(fs.readFileSync(problemsPath, 'utf-8'));


const fastify = Fastify({ logger: true });


fastify.get<{ Params: { id: string } }>("/api/problem/:id", async (request, reply) => {
  const { id } = request.params;
  const problem = problems.find(p => p.id === id);

  if (!problem) {
    reply.code(404).send({ error: 'Problem not found' });
    return;
  }

  return problem;
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}


start();
