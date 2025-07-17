export type ItemWithId = { id: number };

export type StorageTypes = "users" | "dreams" | "themes";

export interface Dream {
    id: number,
    name: string,
    themeId: number,
    checked: boolean
}

export interface Theme {
    id: number,
    name: string,
};

export interface User {
    id: number,
    username: string,
    password: string,
}

export class InvalidUsernameError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidPasswordError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class InvalidCredentialsError extends Error {
    constructor(message: string) {
        super(message);
    }
}
