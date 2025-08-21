

// tipagem dos produtos
export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

// tipagem da lista de produtos
export type ProductsType = ProductType[];

// tipagem itens carrinho
export type CartItems = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}; //junção da tipagem dos produtos com as props do carrinho

// tipagem do carrinho
export type CartItemsType = CartItems[];