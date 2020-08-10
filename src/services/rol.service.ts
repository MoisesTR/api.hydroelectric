import { RolRepository } from '../repositories/rol.repository';
import { Rol } from '../domain/interfaces/rol';
import { RolCreateDto, RolUpdateDto } from '../dtos/rol.dto';
import ApplicationException from '../common/exceptions/application.exception';

export default class RolService {
    constructor(private readonly rolRepository: RolRepository) {
        this.rolRepository = rolRepository;
    }

    public async all(): Promise<Rol[]> {
        const result = await this.rolRepository.all();
        return result;
    }

    public async store(rolDto: RolCreateDto): Promise<void> {
        const rol = await this.rolRepository.findByRolName(rolDto.rolName);

        if (rol) {
            throw new ApplicationException('El nombre del rol ya existe!');
        } else {
            await this.rolRepository.store(rolDto as Rol);
        }
    }

    public async update(rolDto: RolUpdateDto) {
        const rol = await this.rolRepository.find(rolDto.rolId);

        if (!rol) {
            throw new ApplicationException('El rol a actualizar no existe');
        } else {
            await this.rolRepository.update(rolDto as Rol);
        }
    }
}
