import { RolRepository } from '../rol.repository';
import { Rol } from '../../domain/interfaces/rol';
import { BASE_SELECT } from '../../common/statements/rol.statement';
import SimpleQuery from '../../common/sql/simple.query';

export default class RolRepositoryImpl implements RolRepository {
    public async all(): Promise<Rol[]> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} ORDER BY RolId DESC`);
        return query.getResultList();
    }

    public find(id: number): Promise<Rol | null> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} WHERE RolId = @RolId`);
        query.setParam('RolId', id);
        return query.getSingleResult();
    }

    public findByRolName(rolName: string): Promise<Rol | null> {
        const query = new SimpleQuery<Rol>(`${BASE_SELECT} WHERE RolName = @RolName`);
        query.setParam('RolName', rolName);
        return query.getSingleResult();
    }

    public store(rol: Rol): Promise<number> {
        const now = new Date();
        const query = new SimpleQuery<Rol>(`
            INSERT INTO Rol(RolName, RolDescription, CreatedAt, CreatedBy)
            VALUES(@RolName, @RolDescription, @CreatedAt, @CreatedBy)
        `);
        query.setParam('RolName', rol.rolName);
        query.setParam('RolDescription', rol.rolName);
        query.setParam('CreatedAt', now);
        query.setParam('CreatedBy', rol.createdBy);
        return query.executeUpdate();
    }

    public update(rol: Rol): Promise<number> {
        const now = new Date();
        const query = new SimpleQuery<Rol>(`
            UPDATE  Rol
            SET     RolName = @RolName,
                    RolDescription = @RolDescription,
                    UpdatedAt = @UpdatedAt,
                    UpdatedBy = @UpdatedBy
            WHERE   RolId = @RolId
        `);
        query.setParam('RolName', rol.rolName);
        query.setParam('RolDescription', rol.rolDescription);
        query.setParam('UpdatedAt', now);
        query.setParam('UpdatedBy', rol.updatedBy);
        query.setParam('RolId', rol.rolId);
        return query.executeUpdate();
    }
}
