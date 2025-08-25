"use client"
import {useRouter, useSearchParams, usePathname} from "next/navigation"

const Filter = () => {
    const router = useRouter() //obter rota no geral
    const searchParams = useSearchParams() //obter query strings
    const pathname = usePathname() //obter somente a rota (ignora query)

    //funcao para mudar a categoria adcionando ou removendo o slug da url
    const handleFilter = (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("sort", value); //envia um query param "categogy" para rota com o valor recebido no parametro ou "all"
      router.push(`${pathname}?${params.toString()}`, { scroll: false }); //envia uma nova rota incluindo os query paramns
    }; 

  return (
    <div className="flex items-center justify-end gap-2 text-sm text-gray-500 my-6">
      <span>Sort by:</span>
      <select name="sort" id="sort" className="ring-1 ring-gray-200 shadow-md p-1 rounded-md" onChange={(e) => handleFilter(e.target.value)}>
        <option value={"oldest"}>oldest</option>
        <option value={"newest"}>newest</option>
        <option value={"asc"}>Price: Low to High</option>
        <option value={"desc"}>Price: High to Low</option>
      </select>
    </div>
  )
}

export default Filter;
