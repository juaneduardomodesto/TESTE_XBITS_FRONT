import { ProductCategoryResponse, productCategoryService, productService } from "@/business";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import z from "zod";

const productSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Preço deve ser maior que zero'),
  code: z.string().min(1, 'Código é obrigatório'),
  hasExpirationDate: z.boolean(),
  expirationDate: z.string().optional(),
  productCategoryId: z.number().min(1, 'Categoria é obrigatória')
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [categories, setCategories] = useState<ProductCategoryResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      hasExpirationDate: false,
      price: 0,
      productCategoryId: 0
    }
  });

  const hasExpirationDate = watch('hasExpirationDate');

  useEffect(() => {
    loadCategories();
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadCategories = async () => {
    try {
      const response = await productCategoryService.getAll({
        pageNumber: 1,
        pageSize: 100
      });
      setCategories(response.items);
    } catch (error) {
      toast.error('Erro ao carregar categorias');
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await productService.getById(Number(id));
      if (product) {
        setValue('name', product.name);
        setValue('description', product.description || '');
        setValue('price', product.price);
        setValue('code', product.code);
        setValue('hasExpirationDate', product.hasExpirationDate);
        setValue('expirationDate', product.expirationDate || '');
        setValue('productCategoryId', product.productCategoryId || 0);
      }
    } catch (error) {
      toast.error('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (isEditing) {
        await productService.update({
          productId: Number(id),
          ...data
        });
        toast.success('Produto atualizado com sucesso');
      } else {
        await productService.create(data);
        toast.success('Produto criado com sucesso');
      }
      navigate('/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar produto');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/products')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEditing ? 'Editar Produto' : 'Novo Produto'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome *"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Código *"
              error={errors.code?.message}
              {...register('code')}
            />
          </div>

          <Textarea
            label="Descrição"
            error={errors.description?.message}
            {...register('description')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Preço *"
              type="number"
              step="0.01"
              error={errors.price?.message}
              {...register('price', { valueAsNumber: true })}
            />

            <Select
              label="Categoria *"
              error={errors.productCategoryId?.message}
              options={categories.map(cat => ({
                value: cat.id,
                label: cat.name
              }))}
              placeholder="Selecione uma categoria"
              {...register('productCategoryId', { valueAsNumber: true })}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="hasExpirationDate"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              {...register('hasExpirationDate')}
            />
            <label htmlFor="hasExpirationDate" className="text-sm font-medium text-gray-700">
              Produto possui data de validade
            </label>
          </div>

          {hasExpirationDate && (
            <Input
              label="Data de Validade"
              type="date"
              error={errors.expirationDate?.message}
              {...register('expirationDate')}
            />
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/products')}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {isEditing ? 'Atualizar' : 'Criar'} Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}