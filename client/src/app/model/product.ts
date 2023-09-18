export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl?: string,
    type?: string,
    brand?: string,
    quantityInStock?: number
}