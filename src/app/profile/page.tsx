"use client";
import Image from "next/image";
import InputForm from "../components/InputForm";
import ButtonInput from "../components/ButtonInput";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const updateUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type updateFormData = z.infer<typeof updateUserSchema>;

const Profile = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, watch,
  } = useForm<updateFormData>({ resolver: zodResolver(updateUserSchema) });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

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
  }, [reset]);

  const onSubmit = async (data: updateFormData) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Você precisa estar logado para atualizar o perfil.");
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
        alert("Perfil atualizado com sucesso!");
      } else {
        alert(result.error || "Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      alert("Erro ao conectar com o servidor");
    }
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir sua conta?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para excluir a conta.");
      return;
    }

    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.removeItem("token"); 
        alert("Conta excluída com sucesso!");
        router.push("/login"); 
      } else {
        alert(result.error || "Erro ao excluir conta.");
      }
    } catch (err) {
      console.error("Erro ao excluir conta:", err);
      alert("Erro ao conectar com o servidor");
    }
  };

  const avatarUser = watch("name") || "default";

  return (
    <div className="h-screen flex flex-col gap-6 justify-center items-center mx-auto px-4 max-w-2xl">
      <button
        type="button"
        onClick={() => router.back()}
        className="fixed top-8 left-4 text-[var(--text-color)] flex items-center gap-2 mb-8  cursor-pointer hover:text-[var(--primary-color)]"
      >
        <ArrowLeft /> Voltar
      </button>
      <Image
        src={`https://i.pravatar.cc/150?u=${avatarUser}`}
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
          <ButtonInput variant="save" title="Salvar" />
          <ButtonInput
            variant="delete"
            title="Excluir conta"
            onClick={handleDeleteAccount}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
