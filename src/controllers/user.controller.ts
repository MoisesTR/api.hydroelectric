import { DELETE, GET, POST, PUT, route } from 'awilix-express';
import { Request, Response } from 'express';
import BaseController from '../common/controllers/base.controller';
import { UserCreateDTO, UserUpdateDto } from '../dtos/user.dto';
import UserService from '../services/user.service';

@route('/user')
export default class UserController extends BaseController {
    constructor(private readonly userService: UserService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            const result = await this.userService.all();
            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const result = await this.userService.find(id);
            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            const { body } = req;
            await this.userService.store(body as UserCreateDTO);
            res.send({ message: 'El usuario ha sido creado' });
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);
            const { body } = req;
            body.userId = id;

            await this.userService.update(body as UserUpdateDto);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 10);

            // await this.userService.remove(id);
            res.send({ message: 'No se encuentra implementado' });
        } catch (error) {
            this.handleException(error, res);
        }
    }
}
