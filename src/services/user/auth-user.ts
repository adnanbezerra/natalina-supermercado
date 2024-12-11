import { API_URL } from "../../constants/api";

// Interface para a resposta do login
interface LoginResponse {
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

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "Erro desconhecido ao fazer login");
        }

        // A resposta bem-sucedida é armazenada no formato esperado
        const data: LoginResponse = await response.json();

        // Armazenando o token no localStorage
        localStorage.setItem("token", data.token);

        return data; // Retorna o usuário e o token
    } catch (error) {
        // Lida com qualquer erro que ocorra durante o processo de login
        throw new Error("Erro ao fazer login: " + error.message);
    }
}

export function logoutUser(): void {
    // Remove o token do localStorage ao "deslogar" o usuário
    localStorage.removeItem("token");
}
