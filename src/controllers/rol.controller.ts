import { GET, POST, PUT, route } from 'awilix-express';
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
        try {
            const result = await this.rolService.all();
            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @POST()
    public async store(req: Request, res: Response) {
        try {
            const { body } = req;
            await this.rolService.store(body as RolCreateDto);
            res.send();
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
            body.rolId = id;
            await this.rolService.update(body as RolUpdateDto);
            res.send();
        } catch (error) {
            this.handleException(error, res);
        }
    }
}
