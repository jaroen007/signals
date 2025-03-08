export type PriceLine = {
    id?: number;
    code: string;
    name: string;
    unitId?: number;
    unitName?: string;
    price: number;
    quantity: number;
    discount: number;
};