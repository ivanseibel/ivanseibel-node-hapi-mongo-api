'use strict';

import { ResponseToolkit, ServerRoute } from '@hapi/hapi';
import { createUserController } from '../useCases/CreateUser';
import { LoginRequestType } from '../useCases/CreateUser/CreateUserController';

const users: ServerRoute[] = [
    {
        path: '/v1/users',
        method: 'GET',
            handler: (request, reply) => {
                return reply.response('Hello World').code(201);
            },
    },
    {
        path: '/v1/users',
        method: 'POST',
            handler: async (request: LoginRequestType, reply: ResponseToolkit) => {
                try {
                    return createUserController.handle(request, reply);
                } catch (error) {
                    return reply.response({message: error || 'Unexpected error'}).code(400);
                }
            },
    },
];

export { users };
