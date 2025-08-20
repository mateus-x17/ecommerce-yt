import ProductList from '@/components/ProductList' //componente com a lista de produtos em cards
// import { category } from "@/components/categories";
import Image from "next/image";
const Homepage = async ({searchParams}: {searchParams: Promise<{category: string}>}) => {
  // recebe o query param da url que indica a categoria
  // 
  const category = (await searchParams).category

  return (
    <div className="">
      {/* div com banner */}
      <div className="relative aspect-[3/1] mb-12 mt-6">
        <Image src="/featured.png" alt="Featured Product" fill />
      </div>
      {/* lista de produtos */}
      <ProductList category={category} params='homepage'/>
    </div>
  );
};

export default Homepage;
