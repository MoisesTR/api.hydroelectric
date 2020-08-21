import { RolRepository } from '../rol.repository';
import { Rol } from '../../domain/interfaces/rol';
import BASE_SELECT from '../../common/statements/rol.statement';
import SimpleQuery from '../../common/sql/simple.query';
import nameofFactory from '../../common/factory/name-of-factory';

export default class RolRepositoryImpl implements RolRepository {
    private nameOf = nameofFactory<Rol>();

    public async all(): Promise<Rol[]> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} ORDER BY RolId DESC`);
        return query.getResultList();
    }

    public find(id: number): Promise<Rol | null> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} WHERE RolId = ${this.nameOf('rolId')}`);
        query.setParam('rolId', id);
        return query.getSingleResult();
    }

    public findByRolName(rolName: string): Promise<Rol | null> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} WHERE RolName = ${this.nameOf('rolName')}`);
        query.setParam('rolName', rolName);
        return query.getSingleResult();
    }

    public store(rol: Rol): Promise<number> {
        const query = new SimpleQuery<Rol>(`
            INSERT INTO Rol(RolName, RolDescription, CreatedBy)
            VALUES(${this.nameOf('rolName')}, ${this.nameOf('rolDescription')}, ${this.nameOf('createdBy')})
        `);

        query.setParam('rolName', rol.rolName);
        query.setParam('rolDescription', rol.rolName);
        query.setParam('createdBy', rol.createdBy);
        return query.executeUpdate();
    }

    public update(rol: Rol): Promise<number> {
        const now = new Date();
        const query = new SimpleQuery<Rol>(`
            UPDATE  Rol
            SET     RolName = ${this.nameOf('rolName')},
                    RolDescription = ${this.nameOf('rolDescription')},
                    UpdatedAt = ${this.nameOf('updatedAt')},
                    UpdatedBy = ${this.nameOf('updatedBy')}
            WHERE   RolId = ${this.nameOf('rolId')}
        `);
        query.setParam('rolName', rol.rolName);
        query.setParam('rolDescription', rol.rolDescription);
        query.setParam('updatedAt', now);
        query.setParam('updatedBy', rol.updatedBy);
        query.setParam('rolId', rol.rolId);
        return query.executeUpdate();
    }
}
