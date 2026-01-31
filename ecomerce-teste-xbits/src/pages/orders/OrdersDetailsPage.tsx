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
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (!order) {
    return <div className="text-center py-8">Pedido não encontrado</div>;
  }

  const orderStatus = parseOrderStatus(order.status);
  const paymentStatus = parsePaymentStatus(order.paymentStatus);
  const paymentMethod = parsePaymentMethod(order.paymentMethod);

  const getStatusColor = (status: number) => {
    const colors = {
      0: 'bg-yellow-100 text-yellow-800',
      1: 'bg-blue-100 text-blue-800',
      2: 'bg-purple-100 text-purple-800',
      3: 'bg-green-100 text-green-800',
      4: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/orders')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Pedidos
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Pedido #{order.orderNumber}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
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
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Status do Pedido</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(orderStatus)}`}>
                  {OrderStatusLabels[orderStatus]}
                </span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pagamento</p>
                <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(paymentStatus)}`}>
                  {PaymentStatusLabels[paymentStatus]}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {PaymentMethodLabels[paymentMethod]}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Frete</p>
                <p className="font-semibold text-gray-900">
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
          <h2 className="text-xl font-bold text-gray-900 mb-6">Itens do Pedido</h2>
          
          <div className="space-y-4 mb-8">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Preço unitário: {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.unitPrice)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.totalPrice)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="max-w-md ml-auto space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(order.shippingCost)}
                </span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>
                    -{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(order.discount)}
                  </span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-xl text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-600">
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