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

export interface FiltriAuto {
  brand: string;
  model: string;
  price: number[];
  year: number[];
  fuelTypes: string[];
}
