import fastify from 'fastify'

import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'
import { orgsRoutes } from './http/controllers/orgs/routes'

export const app = fastify({
  requestIdHeader: '123123',
})

app.register(petsRoutes)
app.register(orgsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    console.log(error)
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO Here we should log to an external tool like dataDog/NewReçoc/SEntry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
