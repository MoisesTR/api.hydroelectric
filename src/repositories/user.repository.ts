import { UserH } from '../domain/interfaces/user-h';

export interface UserRepository {
    all(): Promise<UserH[]>;
    find(id: number): Promise<UserH | null>;
    findByUserName(userName: string): Promise<UserH | null>;
    store(user: UserH): Promise<number>;
    update(user: UserH): Promise<number>;
    changeState(user: UserH): Promise<number>;
}
