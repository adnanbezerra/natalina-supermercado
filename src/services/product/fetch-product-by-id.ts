import { API_URL } from "../../constants/api";
import { IProduct } from "../../interfaces/product";

export async function fetchProductById(
    productId?: string
): Promise<IProduct | undefined> {
    const product: IProduct = await fetch(
        `${API_URL}/product/${productId}`
    ).then((response) => response.json());

    return product;
}
