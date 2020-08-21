import { UserRepository } from '../repositories/user.repository';
import { UserH } from '../domain/interfaces/user-h';
import { UserCreateDTO, UserUpdateDto, UserChangeStateDto } from '../dtos/user.dto';
import ApplicationException from '../common/exceptions/application.exception';
import BaseService from '../common/services/base.service';
import TypeQuery from '../enums/type-query';

export default class UserService extends BaseService {
    constructor(private readonly userRepository: UserRepository) {
        super('Usuario');
        this.userRepository = userRepository;
    }

    public async find(id: number): Promise<UserH | null> {
        const user = await this.userRepository.find(id);

        if (!user) {
            throw new ApplicationException('El usuario no existe');
        }

        return user;
    }

    public async all(): Promise<UserH[]> {
        const result = await this.userRepository.all();
        return result;
    }

    public async store(userDto: UserCreateDTO): Promise<void> {
        const user = await this.userRepository.findByUserName(userDto.userName);

        if (user) {
            throw new ApplicationException('El nombre de usuario ya se encuentra registrado!, intenta con otro');
        } else {
            const rowsAffected = await this.userRepository.store(userDto as UserH);

            this.verifyUpdate(rowsAffected, TypeQuery.INSERT);
        }
    }

    public async update(userDto: UserUpdateDto): Promise<void> {
        const user = await this.userRepository.find(userDto.userId);

        if (!user) {
            throw new ApplicationException('El usuario a actualizar no se ha encontrado');
        } else {
            const rowsAffected = await this.userRepository.update(userDto as UserH);

            this.verifyUpdate(rowsAffected, TypeQuery.UPDATE);
        }
    }

    public async changeState(userDto: UserChangeStateDto): Promise<void> {
        const user = await this.userRepository.find(userDto.userId);

        if (!user) {
            throw new ApplicationException('El usuario a cambiar el estado no se ha encontrado');
        } else {
            const rowsAffected = await this.userRepository.changeState(userDto as UserH);

            this.verifyUpdate(rowsAffected, TypeQuery.UPDATE);
        }
    }
}
