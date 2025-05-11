import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const SignUp = () => {
  return (
    <div className="text-[var(--text-color)] bg-[var(--background-secondary)] w-full h-screen flex justify-center items-center">
      <form
        className="w-full h-full sm:w-[500px] sm:h-auto max-w-7xl bg-[var(--background)] p-8 
       rounded-lg flex flex-col justify-center gap-6 "
      >
        <h1 className="mx-auto font-bold text-2xl">Cadastrar</h1>
        <InputForm
          type="text"
          placeholder="Nome"
          maxLength={50}
          label="Nome"
        />

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
        <ButtonInput variant="save" title="Criar conta" />
        <Link href="/login" className="text-sm mx-auto">
          Tenho uma conta
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
