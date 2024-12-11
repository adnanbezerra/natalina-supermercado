import { API_URL } from "../../constants/api";


interface LoginResponse {
    message: string
    token: string;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Erro desconhecido ao fazer login");
        }
        
        const data: LoginResponse = await response.json();

        localStorage.setItem("token", data.token);

        return data; 
    } catch (error: any) {
        throw new Error("Erro ao fazer login: " + error.message);
    }
}

export function logoutUser(): void {
    localStorage.removeItem("token");
}
