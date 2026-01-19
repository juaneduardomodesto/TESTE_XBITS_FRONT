import { useCartStore } from "@/hook/useCartStore";
import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export function CartIndicator() {
  const { cart, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const itemCount = cart?.totalItems || 0;
  const totalValue = cart?.subtotal || 0;

  return (
    <Link 
      to="/cart" 
      className="relative group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition-colors" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </div>
      
      <div className="hidden md:block text-left">
        <p className="text-xs text-gray-500">Carrinho</p>
        <p className="text-sm font-semibold text-gray-900">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalValue)}
        </p>
      </div>
    </Link>
  );
}