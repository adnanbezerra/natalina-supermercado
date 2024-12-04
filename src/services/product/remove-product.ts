import { API_URL } from '../../constants/api';
import { DefaultServiceOutput } from "../../interfaces/service";

export async function removeProduct(
    productId?: string
): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/product/${productId}`, {
        method: "DELETE",
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Produto removido com sucesso",
            };
        }
        return {
            isRight: false,
            message: "Erro ao remover produto",
        };
    });

    return response;
}
