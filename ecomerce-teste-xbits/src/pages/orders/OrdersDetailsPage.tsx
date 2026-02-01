import { OrderResponse, orderService, OrderStatusLabels, PaymentStatusLabels, PaymentMethodLabels, parseOrderStatus, parsePaymentStatus, parsePaymentMethod } from "@/business";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Package, CreditCard, Truck } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const data = await orderService.getById(Number(id));
      setOrder(data);
    } catch (error) {
      toast.error('Erro ao carregar pedido');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!order) return;
    
    const reason = prompt('Motivo do cancelamento:');
    if (!reason) return;

    try {
      await orderService.cancelOrder(order.id, reason);
      toast.success('Pedido cancelado com sucesso');
      loadOrder();
    } catch (error) {
      toast.error('Erro ao cancelar pedido');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-900 dark:text-white">Carregando...</div>;
  }

  if (!order) {
    return <div className="text-center py-8 text-gray-900 dark:text-white">Pedido não encontrado</div>;
  }

  const orderStatus = parseOrderStatus(order.status);
  const paymentStatus = parsePaymentStatus(order.paymentStatus);
  const paymentMethod = parsePaymentMethod(order.paymentMethod);

  const getStatusColor = (status: number) => {
    const colors = {
      0: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      1: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      2: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
      3: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      4: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/orders')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Pedidos
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-800">
        <div className="p-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Pedido #{order.orderNumber}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Realizado em {format(new Date(order.createdAt), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            {orderStatus === 0 && (
              <Button variant="danger" onClick={handleCancelOrder}>
                Cancelar Pedido
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Status do Pedido</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(orderStatus)}`}>
                  {OrderStatusLabels[orderStatus]}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Pagamento</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(paymentStatus)}`}>
                  {PaymentStatusLabels[paymentStatus]}
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {PaymentMethodLabels[paymentMethod]}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Frete</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.shippingCost)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Itens do Pedido</h2>
          
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.productName}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quantidade: {item.quantity}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Preço unitário: {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.unitPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Frete</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.shippingCost)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Desconto</span>
                  <span>
                    -{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(order.discount)}
                  </span>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between font-bold text-xl text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-indigo-600 dark:text-indigo-400">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}