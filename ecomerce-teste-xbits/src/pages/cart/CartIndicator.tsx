import { useCartStore } from "@/hook/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export function CartIndicator() {
  const cart = useCartStore(state => state.cart);

  const itemCount = cart?.totalItems || 0;
  const totalValue = cart?.subtotal || 0;

  return (
    <Link 
      to="/cart" 
      className="relative group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-text-primary-light dark:text-text-primary-dark group-hover:text-accent-light dark:group-hover:text-accent-dark transition-colors" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-accent-light dark:bg-accent-dark text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </div>
      
      <div className="hidden md:block text-left">
        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Carrinho</p>
        <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalValue)}
        </p>
      </div>
    </Link>
  );
}