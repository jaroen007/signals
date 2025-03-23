export type PriceLine = {
    id: number;
    code: string;
    name: string;
    unitId?: number;
    price: number;
    quantity: number;
    discount: number;
    // extended properties
    unitName?: string;
};