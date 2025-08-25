import Image from "next/image";
import Link from "next/link";
import SearchBar from "./searchBar";
import { Bell, Home, ShoppingCart } from "lucide-react";
import ShoopingCartIcon from "./shoppingCartIcon";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">
      {/* esquerda - logo site */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="TrendLama"
          width={36}
          height={36}
          className="w-6 h-6 md:w-9 md:h-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          TRENDLAMA.
        </p>
      </Link>

      {/* direita - icones e barra de pesquisa */}
      <div className="flex items-center gap-6">
        {/* barra de pesquisa */}
        <SearchBar /> 
        {/* icones */}
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600"/>
        {/* cart */}
        <ShoopingCartIcon />
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
};

export default Navbar;