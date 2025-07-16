"use client";
import Image from "next/image";
import InputForm from "../components/InputForm";
import ButtonInput from "../components/ButtonInput";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
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
        src="https://i.pravatar.cc/150?u=$"
        alt="foto de perfil"
        width={150}
        height={150}
        className="rounded-full"
      />
      <InputForm type="text" placeholder="Nome" maxLength={50} label="Nome" />
      <InputForm
        type="email"
        placeholder="Email"
        maxLength={50}
        label="Email"
      />
      <InputForm
        type="password"
        placeholder="Senha"
        maxLength={50}
        label="Senha"
      />
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
        <ButtonInput variant="save" title="Salvar" />
        <ButtonInput variant="delete" title="Excluir conta" />
      </div>
    </div>
  );
};

export default Profile;
