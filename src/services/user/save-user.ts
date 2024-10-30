import { IUserInfo } from '../../interfaces/user';

export async function saveUser(userInfo: IUserInfo): Promise<void> {
    const local = localStorage.getItem("users");
    
    if (!local) {
        return;
    }

    const users: IUserInfo[] =
        JSON.parse(localStorage.getItem("users") || "") || [];

    const user = users.find((user) => user.id === userInfo.id);

    if (!user) {
        return;
    }

    users[users.indexOf(user)] = userInfo;

    localStorage.setItem("users", JSON.stringify(users));
}
