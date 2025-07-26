"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useStatusBar } from "../context/StatusBarContext";
import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";
import ButtonBack from "../components/ButtonBack";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { showStatusBar } = useStatusBar();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        router.push("/tasks");
      } else {
        showStatusBar(result.error || "Erro ao autenticar", "red");
      }
    } catch (err) {
      console.error("Erro de login:", err);
      showStatusBar("Erro ao conectar com o servidor", "red");
    }
  };

  return (
    <div className="bg-[var(--background-secondary)] grid w-full h-screen md:items-center">
      <div className="grid grid-row-2 text-[var(--text-color)] md:w-[90%] lg:w-[80%] xl:w-[60%] md:h-[70%] md:grid-cols-2 md:mx-auto rounded-md overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4 p-14 bg-[var(--background)] "
        >
          <h1 className="mx-auto font-bold text-3xl lg:text-4xl">Entrar</h1>
          <p>use sua conta</p>

          <InputForm
            placeholder="Seu e-mail"
            maxLength={50}
            label="E-mail"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputForm
            placeholder="Sua senha"
            maxLength={50}
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <ButtonInput
            type="submit"
            variant="save"
            title="Entrar"
            load={isSubmitting}
          />
          <ButtonBack onClick={() => router.push("/tasks")} />
        </form>
        <aside className="flex text-white flex-col items-center justify-center gap-6   bg-[var(--primary-color)] p-8 w-full">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Bem vindo de volta!
          </h2>
          <p>
            Mantenha suas tarefas seguras e acessíveis. Entre com sua conta.
          </p>

          <Link className="py-2 px-3 border font-semibold " href="/signup">
            Criar conta
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Login;
