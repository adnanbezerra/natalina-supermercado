import { IProduct } from "../../interfaces/product";
import { DefaultServiceOutput } from "../../interfaces/service";

export async function removeProduct(
    productId: number
): Promise<DefaultServiceOutput> {
    const local = localStorage.getItem("products");

    if (!local) {
        return {
            isRight: false,
            message: "Produto não encontrado",
        };
    }

    const products: IProduct[] =
        JSON.parse(localStorage.getItem("products") || "") || [];

    const updatedProducts = products.filter(
        (product) => product.id !== productId
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));

    return {
        isRight: true,
        message: "Produto removido com sucesso",
    };
}
