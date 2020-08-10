import { Rol } from '../domain/interfaces/rol';

export interface RolRepository {
    all(): Promise<Rol[]>;
    find(id: number): Promise<Rol | null>;
    findByRolName(rolName: string): Promise<Rol | null>;
    store(rol: Rol): Promise<void>;
    update(rol: Rol): Promise<void>;
    remove(id: number): Promise<void>;
}
