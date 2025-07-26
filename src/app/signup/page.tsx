"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";
import { useStatusBar } from "../context/StatusBarContext";
import ButtonBack from "../components/ButtonBack";

const signUpSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type signUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const { showStatusBar } = useStatusBar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        showStatusBar("Conta criada com sucesso!", "blue");
        router.push("/login");
      } else {
        showStatusBar(result.error || "Erro ao criar conta.", "red");
      }
    } catch (err) {
      console.error("Erro criar conta:", err);
      showStatusBar("Erro ao conectar com o servidor", "red");
    }
  };

  return (
    <div className="bg-[var(--background-secondary)] grid w-full h-screen md:items-center">
      <div className="grid grid-row-2 text-[var(--text-color)] md:w-[90%] lg:w-[80%] xl:w-[60%] md:h-[70%]  md:grid-cols-2 md:mx-auto rounded-md overflow-hidden">
        <aside className="flex text-white flex-col items-center justify-center gap-6 bg-[var(--primary-color)] p-8 w-full">
          <h2 className="text-3xl font-bold lg:text-4xl">Olá amigo!</h2>
          <p>Cadastre-se para mantenha suas tarefas seguras e acessíveis.</p>

          <Link className="py-2 px-3 border font-semibold" href="/login">
            Fazer login
          </Link>
        </aside>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 p-14 bg-[var(--background)]"
        >
          <h1 className="mx-auto font-bold text-3xl lg:text-4xl">Cadastrar</h1>
          <p>insira seus dados para registro</p>
          <InputForm
            type="text"
            placeholder="Seu nome"
            maxLength={50}
            label="Nome"
            {...register("name")}
            error={errors.name?.message}
          />

          <InputForm
            type="email"
            placeholder="Seu e-mail"
            maxLength={50}
            label="E-mail"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputForm
            type="password"
            placeholder="Deve ter no mínimo 6 caracteres"
            maxLength={50}
            label="Senha"
            {...register("password")}
            error={errors.password?.message}
          />
          <ButtonInput
            type="submit"
            variant="save"
            title="Criar conta"
            load={isSubmitting}
          />
          <ButtonBack onClick={() => router.back()} />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
