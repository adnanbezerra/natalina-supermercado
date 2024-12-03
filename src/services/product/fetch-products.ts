import { API_URL } from "../../constants/api";
import { IProduct } from "../../interfaces/product";

export async function fetchProducts(): Promise<IProduct[] | undefined> {
    const product: IProduct[] = await fetch(`${API_URL}/product`).then(
        (response) => response.json()
    );

    return product;
}
