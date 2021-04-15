'use strict';

import { ResponseToolkit, Request } from 'hapi';
import { createUserController } from '../useCases/CreateUser';
import { ILoginRequest } from '../useCases/CreateUser/CreateUserController';

const users = [
    {
        path: '/v1/users',
        method: 'GET',
            handler: (request: Request, reply: ResponseToolkit) => {
                return reply.response('Hello World').code(201);
            },
    },
    {
        path: '/v1/users',
        method: 'POST',
            handler: async (request: ILoginRequest, reply: ResponseToolkit) => {
                try {
                    return createUserController.handle(request, reply);
                } catch (error) {
                    return reply.response({message: error || 'Unexpected error'}).code(400);
                }
                return reply.response('Hello World').code(201);
            },
    },
];

export { users };
