import e, { Request, Response } from 'express';
import { route, POST } from 'awilix-express';
import IdentityService from '../services/identity.service';
import BaseController from '../common/controllers/base.controller';

@route('/identity')
export default class AuthenticationController extends BaseController {
    constructor(private readonly identityService: IdentityService) {
        super();
    }

    @route('/authenticate')
    @POST()
    public async authenticate(req: Request, res: Response) {
        try {
            const { body } = req;
            const result = await this.identityService.authenticate(body.userName, body.password);
            res.send(result);
        } catch (error) {
            this.handleException(error, res);
        }
    }
}
