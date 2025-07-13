"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    } else {
      alert(data.error || "Erro ao autenticar");
    }
  };

  return (
    <div className="text-[var(--text-color)] bg-[var(--background-secondary)] w-full h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit}
        className="w-full h-full sm:w-[500px] sm:h-auto max-w-7xl bg-[var(--background)] p-8 
       rounded-lg flex flex-col justify-center gap-6 "
      >
        <h1 className="mx-auto font-bold text-2xl">Entrar</h1>

        <InputForm
          type="text"
          placeholder="Email"
          maxLength={50}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputForm
          type="text"
          placeholder="Senha"
          maxLength={50}
          label="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonInput variant="save" title="Entrar" onClick={() => setIsLogin(!isLogin)}/>
        <Link href="/signup" className="text-sm mx-auto">
          Criar conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
