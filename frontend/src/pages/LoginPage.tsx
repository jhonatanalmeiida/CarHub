import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Button, Input } from "../components/ui";
import { useAuth } from "../contexts/AuthContext";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export function LoginPage() {
  const navigate = useNavigate();
  const { loginAction } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      className="space-y-5"
      onSubmit={handleSubmit(async (values) => {
        await loginAction(values);
        navigate("/");
      })}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-accent">Acesso</p>
        <h1 className="mt-3 font-display text-4xl">Entrar no CarHub Cloud</h1>
      </div>
      <div className="space-y-3">
        <Input placeholder="Email" {...register("email")} />
        {errors.email ? <p className="text-sm text-rose-400">{errors.email.message}</p> : null}
        <Input type="password" placeholder="Senha" {...register("password")} />
        {errors.password ? <p className="text-sm text-rose-400">{errors.password.message}</p> : null}
      </div>
      <Button className="w-full" disabled={isSubmitting}>Entrar</Button>
      <p className="text-sm text-muted">
        Ainda nao tem conta? <Link className="text-accent" to="/cadastro">Cadastre-se</Link>
      </p>
    </form>
  );
}

