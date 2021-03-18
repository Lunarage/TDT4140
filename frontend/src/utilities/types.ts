import { User } from "../types/APITypes";

export interface Credentials {
    username: string;
    password: string;
}

export interface AuthenticationResponse extends User {
    token: string;
}

export type CustomError = {
    error: { name: string; message: string; statusCode: number };
};
