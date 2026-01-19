import { productCategoryService } from "@/business";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import z from "zod";

const categorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  code: z.string().min(1, 'Código é obrigatório')
});

type CategoryFormData = z.infer<typeof categorySchema>;

export function CategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema)
  });

  useEffect(() => {
    if (isEditing) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const category = await productCategoryService.getById(Number(id));
      if (category) {
        setValue('name', category.name);
        setValue('description', category.description);
        setValue('code', category.productCategoryCode);
      }
    } catch (error) {
      toast.error('Erro ao carregar categoria');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (isEditing) {
        await productCategoryService.update({
          id: Number(id),
          ...data
        });
        toast.success('Categoria atualizada com sucesso');
      } else {
        await productCategoryService.create(data);
        toast.success('Categoria criada com sucesso');
      }
      navigate('/categories');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar categoria');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/categories')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {isEditing ? 'Editar Categoria' : 'Nova Categoria'}
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
            label="Descrição *"
            error={errors.description?.message}
            {...register('description')}
          />

          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/categories')}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {isEditing ? 'Atualizar' : 'Criar'} Categoria
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}