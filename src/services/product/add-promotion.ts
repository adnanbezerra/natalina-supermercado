import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function addPromotion({
    productId,
    promotionData,
}: {
    productId: string;
    promotionData: any;
}): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/products/${productId}/promotion`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(promotionData),
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Promoção adicionada com sucesso",
            };
        }
        return {
            isRight: false,
            message: "Erro ao adicionar promoção",
        };
    });

    return response;
}