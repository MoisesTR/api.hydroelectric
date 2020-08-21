import { GET, POST, PUT, DELETE, route } from 'awilix-express';
import { Request, Response } from 'express';
import BaseController from '../common/controllers/base.controller';
import { RolCreateDto, RolUpdateDto } from '../dtos/rol.dto';
import RolService from '../services/rol.service';

@route('/rol')
export default class RolController extends BaseController {
    constructor(private readonly rolService: RolService) {
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        this.rolService
            .all()
            .then((result) => res.send(result))
            .catch((error) => this.handleException(error, res));
    }

    @route('/:id')
    @GET()
    public async findById(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        this.rolService
            .findById(id)
            .then((result) => res.send(result))
            .catch((error) => this.handleException(error, res));
    }

    @POST()
    public async store(req: Request, res: Response) {
        const { body } = req;
        this.rolService
            .store(body as RolCreateDto)
            .then(() => res.send('El rol ha sido creado'))
            .catch((error) => this.handleException(error, res));
    }

    @route('/:id')
    @PUT()
    public async update(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const { body } = req;
        body.rolId = id;

        this.rolService
            .update(body as RolUpdateDto)
            .then((result) => res.send('El rol ha sido actualizado'))
            .catch((error) => this.handleException(error, res));
    }
}
