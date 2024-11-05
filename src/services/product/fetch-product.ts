import { IProduct } from '../../interfaces/product';

export async function fetchProduct(productId: number): Promise<IProduct | undefined> {
    const local = localStorage.getItem("products");
    
    if (!local) {
        return;
    }

    const products: IProduct[] =
        JSON.parse(localStorage.getItem("products") || "") || [];

    const product = products.find((product) => product.id === productId);

    return product;
}
