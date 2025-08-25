"use client" //pois precisa de reatividade 

import Image from "next/image";
import { ArrowRight, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CartItemsType } from "@/types";
import { ShippingFormInputs } from "@/types";
import ShippingForm from "@/components/shippingForm";
import PaymentForm from "@/components/paymentForm";
import CartItems from "@/components/CartItem";
import useCartStore from "@/context/cartContext"; //adc contexto do carrinho

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];
// TEMPORARY
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Adidas CoreFit T-Shirt",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 39.9,
//     sizes: ["s", "m", "l", "xl", "xxl"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "m",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Puma Ultra Warm Zip",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 59.9,
//     sizes: ["s", "m", "l", "xl"],
//     colors: ["gray", "green"],
//     images: { gray: "/products/2g.png", green: "/products/2gr.png" },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "gray",
//   },
//   {
//     id: 3,
//     name: "Nike Air Essentials Pullover",
//     shortDescription:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     description:
//       "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
//     price: 69.9,
//     sizes: ["s", "m", "l"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "l",
//     selectedColor: "black",
//   },
// ];


const CartPage = () =>{
  const router = useRouter();
  const searchParams = useSearchParams();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>(); //guarda os dados do fomrulario de entrega

  // controla o fluxo dos passos atraves de query params se inciando em 1 e avançando
  const activeStep = parseInt(searchParams.get("step") || "1");
  console.log(activeStep);

  const {cart, removeFromCart} = useCartStore(); //extrai funções do contexto

    return(
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
          {/* TITLE */}
          <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
          
          {/* STEPS */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {steps.map((step) => (
              <div className={`flex items-center gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-200"}`} key={step.id}>
                <div className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${ step.id === activeStep ? "bg-gray-800" : "bg-gray-400" }`}>
                  {step.id}
                </div>
                <p className={`text-sm font-medium ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          {/* Steps e detalhes */}
          <div className="w-full flex flex-col lg:flex-row gap-16">
            
            {/* steps - controla o que é mostrado na div esquerda*/}
            <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
              {activeStep === 1 ? (
                cart.map((item)=>(
                  <CartItems key={item.id} item={item}/>
                ))
                // cartItems.map((item)=>(
                //   <CartItems key={item.id} item={item}/>
                // ))
                // como era no desenvolvimento antes de usar o contexto do carrinho
              ) 
              : 
              activeStep === 2 ? (<ShippingForm setShippingForm={setShippingForm}/>) 
              : 
              activeStep === 3 && <ShippingForm setShippingForm={setShippingForm}/> ? (<PaymentForm/>)  
              : 
              <p className="text-sm text-gray-500">please fill in the shipping form to continue</p>}
            </div>
            
            {/* detalhes - div direita*/}
            <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
              <h2 className="font-semibold">Cart details</h2>
              {/* informações financeiras do carrinho */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm ">
                  <p className=" text-gray-400">subtotal</p>
                  <p className="font-medium">${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  {/* <p className="font-medium">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p> */}
                </div>

                <div className="flex justify-between text-sm ">
                  <p className=" text-gray-400">Discount(10%)</p>
                  <p className="font-medium">$10</p>
                </div>

                <div className="flex justify-between text-sm ">
                  <p className=" text-gray-400">Shipping Free</p>
                  <p className="font-medium">$10</p>
                </div>
                <hr className="border-gray-200"/>

                <div className="flex justify-between ">
                  <p className=" text-gray-400">Total</p>
                  <p className="font-semibold">${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>
                  {/* <p className="font-semibold">${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p> */}
                </div>
              </div>

              {/* ao clicar no botão envia o proximo passo na rota */}
              {activeStep === 1 && (
                <button onClick={() => router.push("/cart?step=2", { scroll: false })}
                  className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all duration-300">
                  Continue 
                  <ArrowRight className="w-3 h-3" />
                </button>
            )}
            </div>
          </div>
        </div>
    )

};

export default CartPage;


//como cada item do carrinho estava antes de criar um componente:
// cartItems.map((item)=>{
//   return (
//     // item unico carrinho
//     <div className="flex items-center justify-between" key={item.id}>
//       {/* IMAGE E DETALHES */}
//       <div className="flex gap-8">
//         {/* IMAGEM */}
//         <div className="relative w-32 h-32 bg-gray-50 overflow-hidden">
//           <Image src={item.images[item.selectedColor]} alt={item.name} fill className="object-contain" />
//         </div>
//         {/* DETALHES */}
//         <div className="flex flex-col gap-2">
//           <div className="flex flex-col gap-1">
//               <p className="text-sm font-medium">{item.name}</p>
//               <p className="text-xs text-gray-500">Quantity: {""} {item.quantity}</p>
//               <p className="text-xs text-gray-500">Size: {""} {item.selectedSize}</p>
//               <p className="text-xs text-gray-500">Color: {""} {item.selectedColor}</p>
//           </div>
//           <p className="font-medium">${item.price.toFixed(2)}</p>
//         </div>

//       </div>

//       {/* BOTÃO DELETE */}
//       <button className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center cursor-pointer hover:bg-red-200 transition-all duration-300">
//         <Trash2 className="w-3 h-3" />
//       </button>
//     </div>

//   );
// })
