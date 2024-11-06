import { IProduct } from "../../interfaces/product";

export async function saveDemoProducts(products: IProduct[]) {
    const local = localStorage.getItem("products");

    if (!local) {
        localStorage.setItem("products", JSON.stringify(products));
    }
}