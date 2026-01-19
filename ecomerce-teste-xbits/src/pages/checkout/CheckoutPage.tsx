import { EPaymentMethod, orderService, PaymentMethodLabels } from "@/business";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { useCartStore } from "@/hook/useCartStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import z from "zod";


const checkoutSchema = z.object({
  paymentMethod: z.nativeEnum(EPaymentMethod),
  shippingCost: z.number().min(0),
  discount: z.number().min(0),
  notes: z.string().optional()
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: EPaymentMethod.CreditCard,
      shippingCost: 0,
      discount: 0
    }
  });

  const shippingCost = watch('shippingCost') || 0;
  const discount = watch('discount') || 0;

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart]);

  const calculateTotal = () => {
    if (!cart) return 0;
    return cart.subtotal + shippingCost - discount;
  };

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const order = await orderService.checkout(data);
      if (order) {
        toast.success('Pedido criado com sucesso!');
        navigate(`/orders/${order.id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao finalizar pedido');
    }
  };

  if (!cart) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate('/cart')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Carrinho
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Finalizar Compra
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Forma de Pagamento
                </h2>
                <Select
                  label="Método de Pagamento *"
                  error={errors.paymentMethod?.message}
                  options={Object.entries(PaymentMethodLabels).map(([value, label]) => ({
                    value: Number(value),
                    label
                  }))}
                  {...register('paymentMethod', { valueAsNumber: true })}
                />
              </div>

              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Valores Adicionais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Frete"
                    type="number"
                    step="0.01"
                    error={errors.shippingCost?.message}
                    {...register('shippingCost', { valueAsNumber: true })}
                  />
                  <Input
                    label="Desconto"
                    type="number"
                    step="0.01"
                    error={errors.discount?.message}
                    {...register('discount', { valueAsNumber: true })}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Observações
                </h2>
                <Textarea
                  label="Notas do Pedido"
                  placeholder="Adicione observações sobre o pedido..."
                  error={errors.notes?.message}
                  {...register('notes')}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/cart')}
                >
                  Voltar
                </Button>
                <Button type="submit" loading={isSubmitting}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Finalizar Pedido
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.totalItems} itens)</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(cart.subtotal)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Frete</span>
                <span>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(shippingCost)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Desconto</span>
                  <span>
                    -{new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(discount)}
                  </span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(calculateTotal())}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Itens do Pedido</h3>
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.productName} x {item.quantity}</span>
                    <span>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.totalPrice)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}