import { createContainer, asClass } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import express from 'express';
import UserRepositoryImpl from './repositories/impl/user.repository';
import RolRepositoryImpl from './repositories/impl/rol.repository';
import UserService from './services/user.service';
import RolService from './services/rol.service';
import IdentityService from './services/identity.service';

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // repositories
        userRepository: asClass(UserRepositoryImpl).scoped(),
        rolRepository: asClass(RolRepositoryImpl).scoped(),

        // services
        userService: asClass(UserService).scoped(),
        rolService: asClass(RolService).scoped(),
        identityService: asClass(IdentityService).scoped()
    });

    app.use(scopePerRequest(container));
};
