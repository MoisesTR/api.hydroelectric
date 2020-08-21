import { RolRepository } from '../repositories/rol.repository';
import { Rol } from '../domain/interfaces/rol';
import { RolCreateDto, RolUpdateDto } from '../dtos/rol.dto';
import ApplicationException from '../common/exceptions/application.exception';
import BaseService from '../common/services/base.service';
import TypeQuery from '../enums/type-query';

export default class RolService extends BaseService {
    constructor(private readonly rolRepository: RolRepository) {
        super('Rol');
        this.rolRepository = rolRepository;
    }

    public async all(): Promise<Rol[]> {
        const roles = await this.rolRepository.all();
        return roles;
    }

    public async findById(idRol: number): Promise<Rol | null> {
        const rol = await this.rolRepository.find(idRol);

        if (!rol) {
            throw new ApplicationException('No se encontro el rol');
        }

        return rol;
    }

    public async store(rolDto: RolCreateDto): Promise<void> {
        const rol = await this.rolRepository.findByRolName(rolDto.rolName);

        if (rol) {
            throw new ApplicationException('El nombre del rol ya existe');
        } else {
            const rowsAffected = await this.rolRepository.store(rolDto as Rol);

            this.verifyUpdate(rowsAffected, TypeQuery.INSERT);
        }
    }

    public async update(rolDto: RolUpdateDto) {
        const rol = await this.rolRepository.find(rolDto.rolId);

        if (!rol) {
            throw new ApplicationException('El rol a actualizar no existe');
        } else {
            const rowsAffected = await this.rolRepository.update(rolDto as Rol);

            this.verifyUpdate(rowsAffected, TypeQuery.UPDATE);
        }
    }
}
