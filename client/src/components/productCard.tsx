"use client"; //como precisa de reatividade é renderizado do lado client

import useCartStore from "@/context/cartContext"
import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; //armazenar tamanho e cores do produto selecionado
import { toast } from "react-toastify"; //função para exiber mensagem no conteiner toast do app/layout

// const ProductCard = ({ product }: { product: ProductType }) => {
//   const [productTypes, setProductTypes] = useState({
//     size: product.sizes[0],
//     color: product.colors[0],
//   });

// //   const { addToCart } = useCartStore();

//   const handleProductType = ({
//     type,
//     value,
//   }: {
//     type: "size" | "color";
//     value: string;
//   }) => {
//     setProductTypes((prev) => ({
//       ...prev,
//       [type]: value,
//     }));
//   };

//   const handleAddToCart = () => {
//     addToCart({
//       ...product,
//       quantity: 1,
//       selectedSize: productTypes.size,
//       selectedColor: productTypes.color,
//     });
//     toast.success("Product added to cart")
//   };

//   return (
//     <div className="shadow-lg rounded-lg overflow-hidden">
//       {/* IMAGE */}
//       <Link href={`/products/${product.id}`}>
//         <div className="relative aspect-[2/3]">
//           <Image
//             src={product.images[productTypes.color]}
//             alt={product.name}
//             fill
//             className="object-cover hover:scale-105 transition-all duration-300"
//           />
//         </div>
//       </Link>
//       {/* PRODUCT DETAIL */}
//       <div className="flex flex-col gap-4 p-4">
//         <h1 className="font-medium">{product.name}</h1>
//         <p className="text-sm text-gray-500">{product.shortDescription}</p>
//         {/* PRODUCT TYPES */}
//         <div className="flex items-center gap-4 text-xs">
//           {/* SIZES */}
//           <div className="flex flex-col gap-1">
//             <span className="text-gray-500">Size</span>
//             <select
//               name="size"
//               id="size"
//               className="ring ring-gray-300 rounded-md px-2 py-1"
//               onChange={(e) =>
//                 handleProductType({ type: "size", value: e.target.value })
//               }
//             >
//               {product.sizes.map((size) => (
//                 <option key={size} value={size}>
//                   {size.toUpperCase()}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* COLORS */}
//           <div className="flex flex-col gap-1">
//             <span className="text-gray-500">Color</span>
//             <div className="flex items-center gap-2">
//               {product.colors.map((color) => (
//                 <div
//                   className={`cursor-pointer border-1 ${
//                     productTypes.color === color
//                       ? "border-gray-400"
//                       : "border-gray-200"
//                   } rounded-full p-[1.2px]`}
//                   key={color}
//                   onClick={() =>
//                     handleProductType({ type: "color", value: color })
//                   }
//                 >
//                   <div
//                     className="w-[14px] h-[14px] rounded-full"
//                     style={{ backgroundColor: color }}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* PRICE AND ADD TO CART BUTTON */}
//         <div className="flex items-center justify-between">
//           <p className="font-medium">${product.price.toFixed(2)}</p>
//           <button
//             onClick={handleAddToCart}
//             className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2"
//           >
//             <ShoppingCart className="w-4 h-4" />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const ProductCard = ({ product }: { product: ProductType }) => {
    // armazenar tamanho e cores do produto selecionado e por padrao selecionar o primeiro
    const [productTypes, setProductTypes] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });

    const handleProductType = (
        {type, value,}
        :
        { type: "size" | "color"; value: string; }) => {
        setProductTypes((prev) => ({
            ...prev,
            [type]: value,
        }));
        //recebe o tipo e o valor para alterar o estado
        // exibir no console o valor alterado
        console.log(productTypes)
    }; //funçao para alterar o estado de tamanho e cor de cada produto

    const {addToCart} = useCartStore() //acessa função do caontexto do carrinho para adc itens
    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedSize: productTypes.size,
            selectedColor: productTypes.color,
        });
        toast.success("Product added to cart")
    };

  return (
    <div className="shadow-2xl rounded-lg overflow-hidden flex items-center justify-center sm:flex-col ">
      {/* IMAGEM */}
      <Link href={`/products/${product.id}`}>
        <div className="relative w-64 aspect-[2/3]">
            <Image
            // src={product.images[product.colors[0]]} //primeiro produto dfo arry de cores do produto (TEMPORARIO)
            src={product.images[productTypes.color]} //seleciona a imagem correspondente com a cor armazenada no estado
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
            />
        </div>
      </Link>
      
      {/* DETALHES */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        
        {/* TIPO PRODUTO*/}
        <div className="flex items-center gap-7 text-xs">
            {/* tamanhos */}
            <div className="flex flex-col gap-1">
                <span className="text-gray-500">Size</span>
                {/* faz um map em todos os tamanhos disponiveis e cria uma opção do select */}
                {/* ao selecionar um tamanho chama a funcao para alterar o estado armazenado */}
                <select name="size" id="size" className="ring ring-gray-300 rounded-md px-2 py-1"
                onChange={(e) => handleProductType({ type: "size", value: e.target.value })}>
                    {product.sizes.map((size) => (
                    <option key={size} value={size}>
                        {size.toUpperCase()}
                    </option>
                    ))}
                </select>
            </div>
            {/* cores */}
            <div className="flex flex-col gap-1">
                <span className="text-gray-500">Color</span>
                <div className="flex items-center gap-2">
                    {/* faz um map em todas as cores disponiveis e cria uma div redonda para cada cor  */}
                    {/* ao clicar uma cor chama a funcao para alterar o estado armazenado */}
                    {product.colors.map((color) => (
                        // se a cor selecionado for igual a cor armazenada no estado muda a borda
                        <div className={`cursor-pointer border-1 ${productTypes.color === color ? "border-gray-500" : "border-gray-300"} rounded-full p-[1.2px]`} onClick={(e) => handleProductType({ type: "color", value: color })}>
                            <div className="w-[14px] h-[14px] rounded-full" style={{ backgroundColor: color }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* PREÇO E ADICIONAR AO CARRINHO */}
        <div className="flex items-center justify-between">
            {/* preço */}
            <p className="font-medium">${product.price.toFixed(2)}</p>
            {/* adc carrinho */}
            <button 
            onClick={() => handleAddToCart()}
            className="ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
            </button>
        </div>

      </div>
    </div>
  );
};
export default ProductCard;
