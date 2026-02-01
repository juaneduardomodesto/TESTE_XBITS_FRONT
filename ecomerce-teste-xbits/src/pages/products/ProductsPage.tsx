import { ProductResponse, productService } from "@/business";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Edit, Trash2, Package } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function ProductsPage() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getAll({
        namePrefix: search || undefined,
        pageNumber: currentPage,
        pageSize: 10
      });
      setProducts(response.items);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        loadProducts();
      } else {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    try {
      await productService.delete({ productId: id });
      toast.success('Produto excluído com sucesso');
      loadProducts();
    } catch (error: any) {
      toast.error('Erro ao excluir produto');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Produtos</h1>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">Gerencie o catálogo de produtos</p>
        </div>
        <Link to="/products/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark">
        <div className="p-6 border-b border-light-border dark:border-dark-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar produtos por nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-light-text-tertiary dark:text-dark-text-tertiary mx-auto mb-3 animate-pulse" />
            <p className="text-light-text-tertiary dark:text-dark-text-tertiary">Carregando produtos...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-light-text-tertiary dark:text-dark-text-tertiary mx-auto mb-3" />
            <p className="text-light-text-tertiary dark:text-dark-text-tertiary">
              {search ? 'Nenhum produto encontrado para sua busca' : 'Nenhum produto cadastrado'}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Código</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Preço</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Categoria</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Adicionar</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-light-surface/50 dark:hover:bg-dark-surface/50">
                      <td className="px-6 py-4 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        {product.code}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-light-text-tertiary dark:text-dark-text-tertiary mt-1 line-clamp-1">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-light-accent dark:text-dark-accent">
                        {new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(product.price)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                          {product.productCategory?.name || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <AddToCartButton
                          productId={product.id}
                          productName={product.name}
                          variant="ghost"
                          size="sm"
                          showQuantity={false}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link to={`/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-light-border dark:border-dark-border flex items-center justify-between">
                <Button
                  variant="secondary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  variant="secondary"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
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