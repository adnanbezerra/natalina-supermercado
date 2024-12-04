import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function editProduct({
    input,
    productId,
}: {
    input: any;
    productId: string;
}): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/product/${productId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Produto editado com sucesso",
            };
        }
        return {
            isRight: false,
            message: "Erro ao editar produto",
        };
    });

    return response;
}
