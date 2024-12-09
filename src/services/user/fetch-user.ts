import { IUserInfo } from "../../interfaces/user";
import { API_URL } from "../../constants/api";

export async function fetchUser(userId: number): Promise<IUserInfo | undefined> {
    try {
        const response = await fetch(`${API_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar o usuário");
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}