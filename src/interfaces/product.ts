export interface IProduct {
    _id?: number;
    name: string;
    price: number;
    promotion: boolean;
    image: {
        base64Image?: string;
        contentType: string;
        buffer?: ArrayBuffer;
    };
    promotionDetails?: {
        discount: number;
        description: string;
    };
}
