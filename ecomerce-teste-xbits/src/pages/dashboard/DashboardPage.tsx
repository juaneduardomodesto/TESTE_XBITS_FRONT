import { Package, ShoppingBag, Users, TrendingUp } from "lucide-react";
import { useState } from "react";

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
}

export function DashboardPage() {
  const [stats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0
  });

  const cards = [
    {
      title: 'Total de Produtos',
      value: stats.totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Pedidos',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Usuários',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: 'Receita',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(stats.revenue),
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+23%'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-green-600">
                {card.change}
              </span>
            </div>
            <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
              {card.title}
            </h3>
            <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-6">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Pedidos Recentes
          </h2>
          <div className="text-center text-light-text-tertiary dark:text-dark-text-tertiary py-8">
            Nenhum pedido recente
          </div>
        </div>

        <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark p-6">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Produtos Mais Vendidos
          </h2>
          <div className="text-center text-light-text-tertiary dark:text-dark-text-tertiary py-8">
            Nenhum dado disponível
          </div>
        </div>
      </div>
    </div>
  );
}