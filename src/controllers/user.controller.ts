import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import UserService from '../services/user.service';

@Service()
class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreated = await this.userService.createUser(req.body);
      res.send(userCreated);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
