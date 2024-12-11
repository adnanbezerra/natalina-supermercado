import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function editPromotion({
    productId,
    updatedPromotionData,
}: {
    productId: string;
    updatedPromotionData: any;
}): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/products/${productId}/promotion`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPromotionData),
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Promoção editada com sucesso",
            };
        }
        return {
            isRight: false,
            message: "Erro ao editar promoção",
        };
    });

    return response;
}
