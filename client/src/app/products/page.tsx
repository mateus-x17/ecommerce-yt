import ProductList from '@/components/ProductList';
import React from 'react'

const ProductsPage = async ({searchParams}: {searchParams: Promise<{category: string}>}) => {
  
    // recebe o query param da url que indica a categoria
  const category = (await searchParams).category


  return (
    <div className=''>
        <ProductList category={category} params='products'/>
      
    </div>
  )
}

export default ProductsPage;
