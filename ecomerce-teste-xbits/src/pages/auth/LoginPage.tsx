import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuthStore } from "@/hook/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import z from "zod";

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background flex items-center justify-center p-4">
      {/* Theme Toggle - Posição absoluta */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Card de Login */}
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-8 shadow-lg animate-fade-in">
          {/* Logo/Ícone */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-light-accent dark:bg-dark-accent rounded-2xl flex items-center justify-center">
              <LogIn className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2">
              Bem-vindo de volta
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              Faça login para continuar
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
            >
              Entrar
            </Button>
          </form>

          {/* Link para Registro */}
          <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border text-center">
            <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className="text-light-accent dark:text-dark-accent font-medium hover:underline"
              >
                Registre-se
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-light-text-tertiary dark:text-dark-text-tertiary text-xs mt-6">
          © 2024 E-Commerce. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}