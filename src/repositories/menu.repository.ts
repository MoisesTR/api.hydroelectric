import { Menu } from '../interfaces/menu';

export interface MenuRepository {
    all(): Promise<Menu[]>;
    findByUserId(idRol: number): Promise<Menu[]>;
}
