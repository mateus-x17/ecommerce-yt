import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    // barra de pesquisa é escondida em telas pequenas e com display flex em telas grandes
    <div className='hidden sm:flex items-center gap-2 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md'>
      <Search className="w-4 h-4 text-gray-500"/>
      <input id="search" placeholder="Search..." className="text-sm outline-0"/>
    </div>
  )
}

export default SearchBar