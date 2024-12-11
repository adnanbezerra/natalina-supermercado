import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";
import { IUpdateUser, IUserInfo } from "../../interfaces/user";

export async function saveUser({
    CPF,
    email,
    id,
    name,
    role,
    confirmPassword,
    newPassword,
}: IUpdateUser): Promise<DefaultServiceOutput & { user?: IUserInfo }> {
    try {
        
        if (newPassword !== "" && newPassword !== confirmPassword) {
            return { isRight: false, message: "As senhas não coincidem" };
        }

        // Recuperar o token do localStorage
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token ? `Bearer ${token}` : "",  // Adicionando o token no cabeçalho
            },
            body: JSON.stringify({
                id,
                CPF,
                email,
                name,
                password: newPassword,
                role,
            }),
        });

        if (!response.ok) {
            throw new Error("Erro ao salvar o usuário");
        }

        const updatedUser: IUserInfo = await response.json();
        return { isRight: true, message: "Usuário salvo com sucesso!", user: updatedUser };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
        return { isRight: false, message: errorMessage };
    }
}
