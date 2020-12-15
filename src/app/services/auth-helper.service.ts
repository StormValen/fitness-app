import { User } from '../models/user.model';

/**
 *  CRUD methods to mock user login on localStorage.
 */
export class AuthHelperService {
    
    public createUserLocalStorage(userEmail: string, userId: string): void {
        localStorage.setItem('userEmail', userEmail);
        localStorage.setItem('userId', userId);
    }

    public readUserLocalStorage(): User {
        if (localStorage.getItem('userEmail') && localStorage.getItem('userId')) {
            return {
                email: localStorage.getItem('userEmail'),
                userId: localStorage.getItem('userId')
            };
        }
    }

    public updateUserLocalStorage(): void {
        // TODO:
    }

    public deleteUserLocalStorage(): void {
        localStorage.clear();
    }
}