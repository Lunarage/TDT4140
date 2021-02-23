import { User } from "../types/APITypes";

export interface Credentials {
    username: string;
    password: string;
}

export interface AuthenticationResponse extends User {
    token: string;
}
