import { IProduct } from '../../interfaces/product';

export async function fetchProduct(userId: number): Promise<IProduct | undefined> {
    const local = localStorage.getItem("products");
    
    if (!local) {
        return;
    }

    const products: IProduct[] =
        JSON.parse(localStorage.getItem("users") || "") || [];

    const product = products.find((product) => product.id === userId);

    return product;
}
