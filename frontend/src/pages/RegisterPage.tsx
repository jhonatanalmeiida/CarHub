import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6)
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerAction } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(async (values) => {
        await registerAction(values);
        navigate("/");
      })}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-accent">Cadastro</p>
        <h1 className="mt-3 font-display text-4xl">Crie sua garagem digital</h1>
      </div>
      <div className="space-y-3">
        <Input placeholder="Nome" {...register("name")} />
        {errors.name ? <p className="text-sm text-rose-400">{errors.name.message}</p> : null}
        <Input placeholder="Email" {...register("email")} />
        {errors.email ? <p className="text-sm text-rose-400">{errors.email.message}</p> : null}
        <Input type="password" placeholder="Senha" {...register("password")} />
        {errors.password ? <p className="text-sm text-rose-400">{errors.password.message}</p> : null}
      </div>
      <Button className="w-full" disabled={isSubmitting}>Criar conta</Button>
      <p className="text-sm text-muted">
        Ja possui acesso? <Link className="text-accent" to="/login">Entrar</Link>
      </p>
    </form>
  );
}

