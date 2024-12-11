import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function deletePromotion(productId: string): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/products/${productId}/promotion`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Promoção removida com sucesso",
            };
        }
        return {
            isRight: false,
            message: "Erro ao remover promoção",
        };
    });

    return response;
}
