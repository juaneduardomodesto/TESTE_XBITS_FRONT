import { ProductCategoryResponse, productCategoryService } from "@/business";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export function CategoriesPage() {
  const [categories, setCategories] = useState<ProductCategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await productCategoryService.getAll({
        namePrefix: search || undefined,
        pageNumber: currentPage,
        pageSize: 10
      });
      setCategories(response.items);
      setTotalPages(response.totalPages);
    } catch (error: any) {
      toast.error('Erro ao carregar categorias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [currentPage, search]);

  const handleDelete = async (id: number) => {
    if (!confirm('Deseja realmente excluir esta categoria?')) return;

    try {
      await productCategoryService.delete({ id });
      toast.success('Categoria excluída com sucesso');
      loadCategories();
    } catch (error: any) {
      toast.error('Erro ao excluir categoria');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">Categorias</h1>
        <Link to="/categories/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nova Categoria
          </Button>
        </Link>
      </div>

      <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-lg-light dark:shadow-lg-dark">
        <div className="p-6 border-b border-light-border dark:border-dark-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-text-tertiary dark:text-dark-text-tertiary w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar categorias..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-light-border dark:border-dark-border rounded-lg bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-light-text-tertiary dark:text-dark-text-tertiary">Carregando...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-light-text-tertiary dark:text-dark-text-tertiary">Nenhuma categoria encontrada</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Código</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Nome</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Descrição</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-light-border dark:divide-dark-border">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-light-surface/50 dark:hover:bg-dark-surface/50">
                      <td className="px-6 py-4 text-sm text-light-text-primary dark:text-dark-text-primary">{category.productCategoryCode}</td>
                      <td className="px-6 py-4 text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-light-text-secondary dark:text-dark-text-secondary">{category.description}</td>
                      <td className="px-6 py-4 text-sm text-right space-x-2">
                        <Link to={`/categories/${category.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
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