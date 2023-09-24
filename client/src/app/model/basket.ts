export interface Basket {
  id: string;
  buyerId: string;
  basketItems: BasketItem[];
}

export interface BasketItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  type: string;
  quantity: number;
  quantityInStock: number;
}
