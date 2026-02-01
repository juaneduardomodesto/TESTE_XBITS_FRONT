import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { ERoles, userService, RoleLabels } from '@/business';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

const userSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha obrigatória'),
  acceptPrivacyPolicy: z.boolean(),
  acceptTermsOfUse: z.boolean(),
  isActive: z.boolean(),
  roles: z.nativeEnum(ERoles)
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type UserFormData = z.infer<typeof userSchema>;

export function UserFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      acceptPrivacyPolicy: true,
      acceptTermsOfUse: true,
      isActive: true,
      roles: ERoles.Customer
    }
  });

  useEffect(() => {
    if (isEditing) {
      loadUser();
    }
  }, [id]);

  const normalizeRole = (role: any): ERoles => {
    if (typeof role === 'string') {
      return ERoles[role as keyof typeof ERoles] || ERoles.Customer;
    }
    return role as ERoles;
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const user = await userService.getById(Number(id));
      if (user) {
        setValue('name', user.name);
        setValue('email', user.email);
        setValue('cpf', user.cpf);
        setValue('acceptPrivacyPolicy', user.acceptPrivacyPolicy);
        setValue('acceptTermsOfUse', user.acceptTermsOfUse);
        setValue('isActive', user.isActive);
        
        const roleValue = normalizeRole(user.role);
        setValue('roles', roleValue);
        
        setValue('password', '******');
        setValue('confirmPassword', '******');
      }
    } catch (error) {
      toast.error('Erro ao carregar usuário');
      console.error('Erro ao carregar usuário:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditing) {
        await userService.update({
          id: Number(id),
          ...data
        });
        toast.success('Usuário atualizado com sucesso');
      } else {
        await userService.create(data);
        toast.success('Usuário criado com sucesso');
      }
      navigate('/users');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-gray-900 dark:text-white">Carregando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/users')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow dark:shadow-gray-800 p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {isEditing ? 'Editar Usuário' : 'Novo Usuário'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nome *"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="CPF *"
              error={errors.cpf?.message}
              placeholder="00000000000"
              {...register('cpf')}
            />
          </div>

          <Input
            label="Email *"
            type="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Senha *"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirmar Senha *"
              type="password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <Select
            label="Perfil *"
            error={errors.roles?.message}
            options={Object.entries(RoleLabels).map(([value, label]) => ({
              value: Number(value),
              label
            }))}
            {...register('roles', { valueAsNumber: true })}
          />

          <div className="space-y-3 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600"
                {...register('isActive')}
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Usuário ativo
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptPrivacyPolicy"
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600"
                {...register('acceptPrivacyPolicy')}
              />
              <label htmlFor="acceptPrivacyPolicy" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Aceita política de privacidade
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="acceptTermsOfUse"
                className="w-4 h-4 text-indigo-600 dark:text-indigo-500 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600"
                {...register('acceptTermsOfUse')}
              />
              <label htmlFor="acceptTermsOfUse" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Aceita termos de uso
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/users')}
            >
              Cancelar
            </Button>
            <Button type="submit" loading={isSubmitting}>
              {isEditing ? 'Atualizar' : 'Criar'} Usuário
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}