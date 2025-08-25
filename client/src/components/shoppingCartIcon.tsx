"use client" //pois o contexto do carrinho precisa de reatividade

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import useCartStore from "@/context/cartContext";

const ShoppingCartIcon = () =>{
    const { cart, hasHydrated } = useCartStore(); //acessar o contexto do carrinho
    if(!hasHydrated) return null;

    return(
        <Link href="/cart" className="relative">
            <ShoppingCart className="w-4 h-4 text-gray-600"/>
            <span className="absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-5 h-4 p-1 flex justify-center items-center text-xs"><b>{cart.reduce((acc, item) => acc + item.quantity, 0)}</b></span>
            {/* exibe a quantidade de itens no carrinho */}
        </Link>
    )
};

export default ShoppingCartIcon;