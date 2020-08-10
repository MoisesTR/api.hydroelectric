import { UserH } from '../domain/interfaces/user-h';

export interface UserRepository {
    all(): Promise<UserH[]>;
    find(id: number): Promise<UserH | null>;
    findByUserName(userName: string): Promise<UserH | null>;
    store(user: UserH): Promise<void>;
    update(user: UserH): Promise<void>;
    remove(id: number): Promise<void>;
}
