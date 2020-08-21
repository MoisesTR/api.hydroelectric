import { Rol } from '../domain/interfaces/rol';

export interface RolRepository {
    all(): Promise<Rol[]>;
    find(id: number): Promise<Rol | null>;
    findByRolName(rolName: string): Promise<Rol | null>;
    store(rol: Rol): Promise<number>;
    update(rol: Rol): Promise<number>;
}
