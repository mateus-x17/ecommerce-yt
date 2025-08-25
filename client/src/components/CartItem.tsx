import { Trash2 } from "lucide-react";
import Image from "next/image";
import { CartItem } from "@/types";
import useCartStore  from "@/context/cartContext";

const CartItems = ({ item }: { item: CartItem }) => {
  const cartStore = useCartStore(); //acessa função do caontexto do carrinho
  const { removeFromCart } = cartStore;  //extrai funções do contexto
  return (
    // item unico carrinho
    <div className="flex items-center justify-between" key={item.id + item.selectedColor + item.selectedSize}>
      
      {/* IMAGE E DETALHES */}
      <div className="flex gap-8">
        
            {/* IMAGEM */}
            <div className="relative w-32 h-32 bg-gray-50 overflow-hidden">
            <Image
                src={item.images[item.selectedColor]}
                alt={item.name}
                fill
                className="object-contain"
            />
            </div>
            
            {/* DETALHES */}
            <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                Quantity: {""} {item.quantity}
                </p>
                <p className="text-xs text-gray-500">
                Size: {""} {item.selectedSize}
                </p>
                <p className="text-xs text-gray-500">
                Color: {""} {item.selectedColor}
                </p>
            </div>
            <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
      </div>

      {/* BOTÃO DELETE */}
      <button 
      onClick={() => removeFromCart(item)}
      className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-200 transition-all duration-300">
        <Trash2 className="w-3 h-3" />
      </button>
    
    </div>
  );
};

export default CartItems;
