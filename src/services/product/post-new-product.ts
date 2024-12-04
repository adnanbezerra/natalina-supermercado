import { API_URL } from "../../constants/api";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function postNewProduct(
    input: any
): Promise<DefaultServiceOutput> {
    const response = fetch(`${API_URL}/product`, {
        method: "POST",
        body: input,
    }).then((response) => {
        if (response.ok) {
            return {
                isRight: true,
                message: "Produto adicionado com sucesso",
            };
        } else {
            return {
                isRight: false,
                message: "Erro ao adicionar produto",
            };
        }
    });

    return response;
}
