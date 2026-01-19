import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/hook/useCartStore";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  productId: number;
  productName: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showQuantity?: boolean;
}

export function AddToCartButton({
  productId,
  productName,
  className = '',
  variant = 'primary',
  size = 'md',
  showQuantity = true
}: AddToCartButtonProps) {
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = async () => {
    if (quantity < 1) {
      toast.error('Quantidade deve ser pelo menos 1');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        productId,
        quantity
      });
      
      setShowSuccess(true);
      toast.success(`${productName} adicionado ao carrinho!`);
      
      setTimeout(() => {
        setShowSuccess(false);
        setQuantity(1);
      }, 2000);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erro ao adicionar ao carrinho');
    } finally {
      setIsAdding(false);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (showSuccess) {
    return (
      <div className={`flex items-center justify-center gap-2 ${className}`}>
        <Check className="w-5 h-5 text-green-600" />
        <span className="text-green-600 font-medium">Adicionado!</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showQuantity && (
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-medium">{quantity}</span>
          <button
            onClick={incrementQuantity}
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}

      <Button
        variant={variant}
        size={size}
        onClick={handleAddToCart}
        loading={isAdding}
        disabled={isAdding}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Adicionar
      </Button>
    </div>
  );
}