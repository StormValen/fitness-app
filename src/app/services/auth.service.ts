import { Subject } from 'rxjs';

import { AuthData } from "../models/auth-data.model";
import { User } from "../models/user.model";

export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    signup(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authChange.next(this.user != null);
    }

    login(authData: AuthData): void {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authChange.next(this.user != null);
    }

    logout(): void {
        this.user = null;
        this.authChange.next(this.user != null);
    }

    getUser(): User {
        return { ...this.user };
    }

    isAuth(): boolean {
        return this.user != null;
    }
}