import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/hook/useCartStore";
import { ShoppingBag, Minus, Plus, Trash2, ShoppingCart, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function CartPage() {
  const navigate = useNavigate();
  const { cart, loading, updateCartItem, removeFromCart, clearCart } = useCartStore();

  const handleUpdateQuantity = async (cartItemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return;

    try {
      await updateCartItem({ cartItemId, quantity: newQuantity });
      toast.success('Quantidade atualizada');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erro ao atualizar quantidade');
    }
  };

  const handleRemoveItem = async (cartItemId: number, productName: string) => {
    if (!confirm(`Deseja realmente remover "${productName}" do carrinho?`)) return;

    try {
      await removeFromCart(cartItemId);
      toast.success('Item removido do carrinho');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erro ao remover item');
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Deseja realmente limpar todo o carrinho?')) return;

    try {
      await clearCart();
      toast.success('Carrinho limpo com sucesso');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Erro ao limpar carrinho');
    }
  };

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Carrinho vazio');
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-light-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4 animate-pulse" />
            <p className="text-light-text-secondary dark:text-dark-text-secondary">Carregando carrinho...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-8">Carrinho de Compras</h1>
        
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-12 text-center">
          <ShoppingBag className="w-16 h-16 text-light-text-tertiary dark:text-dark-text-tertiary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
            Adicione produtos ao carrinho para continuar comprando
          </p>
          <Link to="/products">
            <Button>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ver Produtos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Carrinho de Compras</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">{cart.totalItems} {cart.totalItems === 1 ? 'item' : 'itens'} no carrinho</p>
        </div>
        <Button variant="danger" onClick={handleClearCart}>
          <Trash2 className="w-4 h-4 mr-2" />
          Limpar Carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-6 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                {/* Imagem do Produto */}
                <div className="flex-shrink-0">
                  {item.productImageUrl ? (
                    <img
                      src={item.productImageUrl}
                      alt={item.productName}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-light-surface dark:bg-dark-surface rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-light-text-tertiary dark:text-dark-text-tertiary" />
                    </div>
                  )}
                </div>

                {/* Informações do Produto */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-light-text-primary dark:text-dark-text-primary text-lg mb-1">
                    {item.productName}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                    Código: <span className="font-medium">{item.productCode}</span>
                  </p>
                  <p className="text-lg font-bold text-light-accent dark:text-dark-accent">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.unitPrice)}
                    <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary font-normal ml-2">
                      por unidade
                    </span>
                  </p>
                </div>

                {/* Controles de Quantidade */}
                <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-2 bg-light-surface dark:bg-dark-surface rounded-lg p-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-light-text-primary dark:text-dark-text-primary">
                      {item.quantity}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Subtotal</p>
                    <p className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.totalPrice)}
                    </p>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id, item.productName)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-6 sticky top-8">
            <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-6">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
                <span>Subtotal ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'itens'})</span>
                <span className="font-medium text-light-text-primary dark:text-dark-text-primary">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(cart.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
                <span>Frete</span>
                <span className="text-sm text-green-600 font-medium">
                  Calculado no checkout
                </span>
              </div>

              <div className="flex justify-between text-light-text-secondary dark:text-dark-text-secondary">
                <span>Desconto</span>
                <span className="text-sm text-light-text-tertiary dark:text-dark-text-tertiary">
                  -
                </span>
              </div>
              
              <div className="border-t border-light-border dark:border-dark-border pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-light-text-primary dark:text-dark-text-primary">Total</span>
                  <span className="text-2xl font-bold text-light-accent dark:text-dark-accent">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(cart.subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleCheckout}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Finalizar Compra
              </Button>

              <Link to="/products" className="block">
                <Button variant="secondary" className="w-full">
                  Continuar Comprando
                </Button>
              </Link>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Frete Grátis</p>
                  <p className="text-blue-700 dark:text-blue-300">
                    Para compras acima de R$ 200,00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}