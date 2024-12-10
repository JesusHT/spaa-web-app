import { Auth } from '@/app/models/AuthModel';
import { User } from '@/app/models/UserModel';

export interface Profile {
    auth: Auth;
    user: User;
    settings?: any;
}

export interface UserSettings {
    id_setting: number;
    id_users: number;
    delete: '0' | '1';
    edit:   '0' | '1';
    lends:  '0' | '1';
}