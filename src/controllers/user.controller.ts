import { GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import BaseController from '../common/controllers/base.controller';
import { UserCreateDTO, UserUpdateDto, UserChangeStateDto } from '../dtos/user.dto';
import UserService from '../services/user.service';

@route('/user')
export default class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        this.userService
            .all()
            .then((result) => res.send(result))
            .catch((error) => this.handleException(error, res));
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        this.userService
            .find(id)
            .then((result) => res.send(result))
            .catch((error) => this.handleException(error, res));
    }

    @POST()
    public async store(req: Request, res: Response) {
        const { body } = req;
        this.userService
            .store(body as UserCreateDTO)
            .then(() => res.send({ message: 'El usuario ha sido creado' }))
            .catch((error) => this.handleException(error, res));
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const { body } = req;
        body.userId = id;

        this.userService
            .update(body as UserUpdateDto)
            .then(() => res.send('Los datos del usuario han sido actualizados'))
            .catch((error) => this.handleException(error, res));
    }

    @route('/changeState/:id')
    @PUT()
    public async changeState(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const { body } = req;
        body.userId = id;
        const state = body.enabled ? 'habilitado' : 'inhabiitado';

        this.userService
            .changeState(body as UserChangeStateDto)
            .then((result) => res.send(`El usuario ha sido ${state}`))
            .catch((error) => this.handleException(error, res));
    }
}
