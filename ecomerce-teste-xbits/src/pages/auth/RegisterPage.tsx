import { ERoles } from "@/business";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/hook/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import z from "zod";

const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  cpf: z.string().min(11, 'CPF deve ter 11 dígitos'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string().min(6, 'Confirmação de senha obrigatória'),
  acceptPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar a política de privacidade'
  }),
  acceptTermsOfUse: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos de uso'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const register_user = useAuthStore((state) => state.register);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register_user({
        ...data,
        isActive: true,
        roles: ERoles.Customer
      });
      toast.success('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer cadastro');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-light-card dark:bg-dark-card p-8 rounded-2xl shadow-xl">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-light-accent dark:bg-dark-accent rounded-xl flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">
            Criar nova conta
          </h2>
          <p className="mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Preencha os dados para se cadastrar
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Nome completo"
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email"
              type="email"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="CPF"
              placeholder="00000000000"
              error={errors.cpf?.message}
              {...register('cpf')}
            />

            <Input
              label="Senha"
              type="password"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <Input
              label="Confirmar senha"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  id="acceptPrivacyPolicy"
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-light-accent dark:text-dark-accent border-light-border dark:border-dark-border rounded focus:ring-light-accent dark:focus:ring-dark-accent"
                  {...register('acceptPrivacyPolicy')}
                />
                <label htmlFor="acceptPrivacyPolicy" className="ml-2 text-sm text-light-text-primary dark:text-dark-text-primary">
                  Aceito a política de privacidade
                </label>
              </div>
              {errors.acceptPrivacyPolicy && (
                <p className="text-sm text-red-600">{errors.acceptPrivacyPolicy.message}</p>
              )}

              <div className="flex items-start">
                <input
                  id="acceptTermsOfUse"
                  type="checkbox"
                  className="mt-1 w-4 h-4 text-light-accent dark:text-dark-accent border-light-border dark:border-dark-border rounded focus:ring-light-accent dark:focus:ring-dark-accent"
                  {...register('acceptTermsOfUse')}
                />
                <label htmlFor="acceptTermsOfUse" className="ml-2 text-sm text-light-text-primary dark:text-dark-text-primary">
                  Aceito os termos de uso
                </label>
              </div>
              {errors.acceptTermsOfUse && (
                <p className="text-sm text-red-600">{errors.acceptTermsOfUse.message}</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-light-accent dark:text-dark-accent hover:opacity-80"
            >
              Já tem uma conta? Faça login
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full"
            loading={isSubmitting}
          >
            Cadastrar
          </Button>
        </form>
      </div>
    </div>
  );
}