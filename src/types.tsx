import { CiTrophy } from "react-icons/ci";
import { email, z } from "zod";

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

//tipagem formulario de entrega
export const shippingFormSchema = z.object({
    name: z.string().min(1, 'O campo nome é obrigatório'),
    email: z.string().min(1, 'O campo email é obrigatório'),
    phone: z.string().min(7, 'O telefone deve ter pelo menos 7 dígitos').max(11, 'O telefone é obrigatório').regex(/^\d+$/, 'O telefone deve conter apenas números'),
    address: z.string().min(1, 'O campo endereço é obrigatório'),
    city: z.string().min(1, 'O campo cidade é obrigatório'),
})
//tipagem dos botões do fomrulario de entrega
export type ShippingFormInputs = z.infer<typeof shippingFormSchema>


//tipagem formulario de pagamneto
export const paymentFormSchema = z.object({
    cardHolder: z.string().min(1, 'Cartão de crédito obrigatório'),
    cardNumber: z.string().min(16, 'numero de cartão de crédito obrigatorio').max(16, 'numero de cartão de crédito inválido'),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Data de expiração inválida'),
    cvv: z.string().min(3).max(3,'CVV inválido'),
})
//tipagem dos botões do fomrulario de pagamento
export type PaymentFormInputs = z.infer<typeof paymentFormSchema>
