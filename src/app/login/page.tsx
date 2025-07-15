"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.token) {
        localStorage.setItem("token", result.token);
        router.push("/");
      } else {
        alert(result.error || "Erro ao autenticar");
      }
    } catch (err) {
      console.error("Erro de login:", err);
      alert("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="text-[var(--text-color)] bg-[var(--background-secondary)] w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full h-full sm:w-[500px] sm:h-auto max-w-7xl bg-[var(--background)] p-8 
       rounded-lg flex flex-col justify-center gap-6 "
      >
        <h1 className="mx-auto font-bold text-2xl">Entrar</h1>

        <InputForm
          placeholder="Email"
          maxLength={50}
          label="Email"
          type="email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <InputForm
          placeholder="Senha"
          maxLength={50}
          label="Senha"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <ButtonInput variant="save" title="Entrar" />
        <Link href="/signup" className="text-sm mx-auto">
          Criar conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
