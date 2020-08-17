import { TypeQuery } from '../../enums/type-query';
import ApplicationException from '../exceptions/application.exception';

export default class BaseService {
    nameIdentity: string;

    constructor(nameIdentity: string) {
        this.nameIdentity = nameIdentity;
    }

    validateUpdate(rowsAffected: number, typeQuery: TypeQuery): void {
        if (rowsAffected < 1) {
            switch (typeQuery) {
                case TypeQuery.INSERT:
                    throw new ApplicationException(`No se logro insertar al registro de ${this.nameIdentity}`);
                case TypeQuery.UPDATE:
                    throw new ApplicationException(`No se logro actualizar al registro de ${this.nameIdentity}`);
                case TypeQuery.DELETE:
                    throw new ApplicationException(`No se logro inactivar al registro de ${this.nameIdentity}`);
                default:
                    throw new ApplicationException(`Tipo de query no definida`);
            }
        }
    }
}
