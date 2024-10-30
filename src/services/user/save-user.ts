import { DefaultServiceOutput } from "../../interfaces/service";
import { IUpdateUser, IUserInfo } from "../../interfaces/user";

export function saveUser({
    CPF,
    email,
    id,
    name,
    role,
    confirmPassword,
    newPassword,
}: IUpdateUser): DefaultServiceOutput {
    const local = localStorage.getItem("users");

    if (!local) {
        throw new Error("Sem arquivos no local storage");
    }

    if (newPassword !== "" && newPassword !== confirmPassword) {
        return { message: "As senhas não coincidem", isRight: false };
    }

    const users: IUserInfo[] =
        JSON.parse(localStorage.getItem("users") || "") || [];

    const user = users.find((user) => user.id === id);

    if (!user) {
        return { isRight: false, message: "Usuário não encontrado" };
    }

    const newUserInfo: IUserInfo = {
        id,
        CPF,
        email,
        name,
        password: newPassword,
        role,
    };

    users[users.indexOf(user)] = newUserInfo;

    localStorage.setItem("users", JSON.stringify(users));
    return { isRight: true, message: "Usuário salvo com sucesso!" };
}
