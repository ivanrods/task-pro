"use client";
import InputForm from "@/components/InputForm";
import ButtonInput from "@/components/ButtonInput";
import { useRouter } from "next/navigation";
import { useStatusBar } from "../../context/StatusBarContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import ButtonBack from "@/components/ButtonBack";
import Avatar from "@/components/Avatar";

const updateUserSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
type updateFormData = z.infer<typeof updateUserSchema>;

const Profile = () => {
  const router = useRouter();
  const { showStatusBar } = useStatusBar();
  const [currentAvatar, setcurrentAvatar] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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
        setcurrentAvatar(user.avatar);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchUser();
  }, [reset, router, currentAvatar]);

  const saveImageToDatabase = async (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
  };

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
        body: JSON.stringify({
          ...data,
          imageUrl: uploadedImageUrl, // ← inclui aqui
        }),
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
    <div className="h-screen bg-[var(--background-secondary)] flex justify-center items-center">
      <div className="w-full h-screen rounded-md p-8 bg-[var(--background)] flex flex-col gap-6 justify-center items-center md:w-[90%] lg:w-[80%] xl:w-[60%] md:h-[70%]">
        <Avatar
          size={150}
          currentImage={currentAvatar || "/profile.png"}
          onUpload={saveImageToDatabase}
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
            error={errors.name?.message}
          />

          <InputForm
            type="email"
            placeholder="Email"
            maxLength={50}
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />

          <InputForm
            type="password"
            placeholder="Senha"
            maxLength={50}
            label="Senha"
            {...register("password")}
            error={errors.password?.message}
          />

          <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
            <ButtonInput
              type="submit"
              variant="save"
              title="Salvar"
              load={isSubmitting}
            />
            <ButtonInput
              type="button"
              variant="delete"
              title="Excluir conta"
              onClick={handleDeleteAccount}
              load={isSubmitting}
            />
          </div>
          <div className="w-full mx-auto flex justify-center">
            <ButtonBack onClick={() => router.back()} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
