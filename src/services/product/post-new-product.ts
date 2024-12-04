import { API_URL } from "../../constants/api";

export async function postNewProduct(input: any): Promise<undefined> {
    console.log(input);

    fetch(`${API_URL}/product`, {
        method: "POST",
        body: input,
    }).then((response) => response.json());
}
