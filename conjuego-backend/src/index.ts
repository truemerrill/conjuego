import dotenv from 'dotenv';
dotenv.config();

import Fastify from 'fastify';
import mongoose from 'mongoose';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { registerV1Routes } from './routes/v1';

const fastify = Fastify({ logger: true });

// Mongo connection
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

const start = async () => {
  try {
    // Swagger
    if (process.env.NODE_ENV === 'development') {
      await fastify.register(fastifySwagger, {
        openapi: {
          info: {
            title: 'Conjuego API',
            description: 'API for Spanish verb conjugation practice',
            version: '0.1.0',
          },
        },
      });

      await fastify.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
          docExpansion: 'full',
          deepLinking: false,
        },
      });
    }

    // API routes
    await fastify.register(registerV1Routes);
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
