export interface Order {
    id: number;
    price: number;
    description: string;
    tableId: number;
    localId: number;
    date: string;
    isActive: boolean;
}