export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
    CPF: string;
    image?: {
        base64Image?: string;
        contentType: string;
        buffer?: ArrayBuffer;
    };
}

export interface IUpdateUser {
    id: number;
    name: string;
    email: string;
    role: string;
    newPassword: string;
    confirmPassword: string;
    CPF: string;
    image?: {
        base64Image?: string;
        contentType: string;
        buffer?: ArrayBuffer;
    };
}
