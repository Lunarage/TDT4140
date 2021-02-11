export type Authentication = {
    username: string;
    password: string;
};

export type AuthenticationResponse = {
    token: string;
    user_id: number;
    email: string;
};
