import { OrderResponse, orderService, OrderStatusLabels, PaymentStatusLabels, parseOrderStatus, parsePaymentStatus } from "@/business";
import { Button } from "@/components/ui/Button";
import { Eye } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Link } from "react-router-dom";
import { useOrderStore } from "@/hook/useOrderStore";

export function OrdersPage() {
  const { orders, loading, currentPage, totalPages, setPage } = useOrderStore();

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meus Pedidos</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-800">
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Carregando...</div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Você ainda não tem pedidos</p>
            <Link to="/products">
              <Button>Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Número do Pedido
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Pagamento
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.map((order) => {
                    const orderStatus = parseOrderStatus(order.status);
                    const paymentStatus = parsePaymentStatus(order.paymentStatus);
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          #{order.orderNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                          {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(orderStatus)}`}>
                            {OrderStatusLabels[orderStatus]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(paymentStatus)}`}>
                            {PaymentStatusLabels[paymentStatus]}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                          {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(order.total)}
                        </td>
                        <td className="px-6 py-4 text-sm text-right">
                          <Link to={`/orders/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <Button
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                >
                  Próxima
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}