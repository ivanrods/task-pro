"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Conta criada com sucesso!");
      router.push("/login");
    } else {
      alert(data.error || "Erro ao criar conta.");
    }
  };

  return (
    <div className="text-[var(--text-color)] bg-[var(--background-secondary)] w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleRegister}
        className="w-full h-full sm:w-[500px] sm:h-auto max-w-7xl bg-[var(--background)] p-8 
       rounded-lg flex flex-col justify-center gap-6 "
      >
        <h1 className="mx-auto font-bold text-2xl">Cadastrar</h1>
        <InputForm
          type="text"
          placeholder="Nome"
          maxLength={50}
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputForm
          type="email"
          placeholder="Email"
          maxLength={50}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputForm
          type="password"
          placeholder="Senha"
          maxLength={50}
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonInput variant="save" title="Criar conta" />
        <Link href="/login" className="text-sm mx-auto">
          Tenho uma conta
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
