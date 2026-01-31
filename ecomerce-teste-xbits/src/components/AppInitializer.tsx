import { useEffect } from 'react';
import { useCartStore } from '@/hook/useCartStore';
import { useOrderStore } from '@/hook/useOrderStore';
import { useAuthStore } from '@/hook/useAuthStore';

/**
 * AppInitializer - Componente responsável por inicializar dados globais
 * 
 * Carrega automaticamente o carrinho e pedidos quando o usuário está autenticado.
 * Este componente não renderiza nada visualmente.
 */
export function AppInitializer() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const initializeCart = useCartStore((state) => state.initialize);
  const initializeOrders = useOrderStore((state) => state.initialize);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        initializeCart(),
        initializeOrders()
      ]).catch((error) => {
        console.error('Error initializing app data:', error);
      });
    }
  }, [isAuthenticated, initializeCart, initializeOrders]);

  return null;
}