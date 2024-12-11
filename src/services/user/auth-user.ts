import { API_URL } from "../../constants/api";

export async function loginUser(email: string, password: string): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Erro ao fazer login");
        }

        const data = await response.json();
        return data; 
    } catch (error) {
        throw new Error("Erro ao fazer login: " + error.message);
    }
}

export function logoutUser(): void {
    localStorage.removeItem("token"); 
}
