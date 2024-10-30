import { IUserInfo } from '../../interfaces/user';

export async function fetchUser(userId: number): Promise<IUserInfo | undefined> {
    const local = localStorage.getItem("users");
    
    if (!local) {
        return;
    }

    const users: IUserInfo[] =
        JSON.parse(localStorage.getItem("users") || "") || [];

    const user = users.find((user) => user.id === userId);

    return user;
}
