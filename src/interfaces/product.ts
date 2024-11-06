export interface IProduct {
    id: number;
    name: string;
    price: number;
    promotion: boolean;
    image: string;
    promotionDetails?: {
        discount: number;
        description: string;
    };
  }