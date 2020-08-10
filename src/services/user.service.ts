import { UserRepository } from '../repositories/user.repository';
import { UserH } from '../domain/interfaces/user-h';
import { UserCreateDTO, UserUpdateDto } from '../dtos/user.dto';
import ApplicationException from '../common/exceptions/application.exception';

export default class UserService {
    constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async find(id: number): Promise<UserH | null> {
        const result = await this.userRepository.find(id);
        return result;
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
            this.userRepository.store(userDto as UserH);
        }
    }

    public async update(userDto: UserUpdateDto): Promise<void> {
        const user = await this.userRepository.find(userDto.userId);

        if (!user) {
            throw new ApplicationException('El usuario a actualizar no se ha encontrado');
        } else {
            await this.userRepository.update(userDto as UserH);
        }
    }
}
