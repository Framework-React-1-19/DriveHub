export interface Car {
  id?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | '';
  imageUrl: string;
  description: string;
}

export interface CartItem {
  product: Car;
  quantity: number;
}