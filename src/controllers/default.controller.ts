import { Request, Response } from 'express';
import { route, GET } from 'awilix-express';

@route('/')
export default class DefaultController {
    @GET()
    public index(req: Request, res: Response) {
        res.send('Running API HYDROELECTRIC');
    }
}
