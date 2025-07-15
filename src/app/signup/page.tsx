"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const signUpSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type signUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpFormData>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: signUpFormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Conta criada com sucesso!");
        router.push("/login");
      } else {
        alert(result.error || "Erro ao criar conta.");
      }
    } catch (err) {
      console.error("Erro criar conta:", err);
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
        <h1 className="mx-auto font-bold text-2xl">Cadastrar</h1>
        <InputForm
          type="text"
          placeholder="Nome"
          maxLength={50}
          label="Nome"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        <InputForm
          type="email"
          placeholder="Email"
          maxLength={50}
          label="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <InputForm
          type="password"
          placeholder="Senha"
          maxLength={50}
          label="Senha"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <ButtonInput variant="save" title="Criar conta" />
        <Link href="/login" className="text-sm mx-auto">
          Tenho uma conta
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
