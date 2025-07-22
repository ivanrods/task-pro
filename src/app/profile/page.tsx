"use client";
import Image from "next/image";
import InputForm from "../components/InputForm";
import ButtonInput from "../components/ButtonInput";
import { useRouter } from "next/navigation";
import { useStatusBar } from "../context/StatusBarContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import ButtonBack from "../components/ButtonBack";

const updateUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type updateFormData = z.infer<typeof updateUserSchema>;

const Profile = () => {
  const router = useRouter();
  const { showStatusBar } = useStatusBar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<updateFormData>({ resolver: zodResolver(updateUserSchema) });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await res.json();

        reset({
          name: user.name,
          email: user.email,
          password: "",
        });
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchUser();
  }, [reset, router]);

  const onSubmit = async (data: updateFormData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        showStatusBar(
          "Você precisa estar logado para atualizar o perfil.",
          "red"
        );
        return;
      }

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        showStatusBar("Perfil atualizado com sucesso!", "blue");
      } else {
        showStatusBar(result.error || "Erro ao atualizar perfil.", "red");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      showStatusBar("Erro ao conectar com o servidor", "red");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    if (!token) {
      showStatusBar("Você precisa estar logado para excluir a conta.", "red");
      return;
    }
    const password = getValues("password");

    if (!password) {
      showStatusBar(
        "Por favor, preencha a senha atual para confirmar a exclusão da conta.",
        "red"
      );
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.removeItem("token");
        showStatusBar("Conta excluída com sucesso!", "blue");
        router.push("/login");
      } else {
        showStatusBar(result.error || "Erro ao excluir conta.", "red");
      }
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      showStatusBar("Erro ao conectar com o servidor", "red");
    }
  };

  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center mx-auto px-4 max-w-2xl">
     
      <Image
        src="/profile.png"
        alt="foto de perfil"
        width={150}
        height={150}
        className="rounded-full"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-6"
      >
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
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <ButtonInput type="submit" variant="save" title="Salvar" />
          <ButtonInput
            type="button"
            variant="delete"
            title="Excluir conta"
            onClick={handleDeleteAccount}
          />
          <ButtonBack onClick={() => router.back()} />
        </div>
         
      </form>
    </div>
  );
};

export default Profile;
