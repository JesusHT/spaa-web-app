import { Auth } from '@/app/models/AuthModel';
import { User } from '@/app/models/UserModel';

export interface Profile {
    auth: Auth;
    user: User;
}