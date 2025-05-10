import Link from "next/link";
import ButtonInput from "../components/ButtonInput";
import InputForm from "../components/InputForm";

const Login = () => {
  return (
    <div className="text-[var(--text-color)] bg-[var(--background-secondary)] w-full h-screen flex justify-center items-center">
      <form
        className="w-full h-full sm:w-[500px] sm:h-auto max-w-7xl bg-[var(--background)] p-8 
       rounded-lg flex flex-col justify-center gap-6 "
      >
        <h1 className="mx-auto font-bold text-2xl">Entrar</h1>

        <InputForm
          type="text"
          id="title"
          value=""
          placeholder="Email"
          maxLength={50}
          label="Email"
        />
        <InputForm
          type="text"
          id="title"
          value=""
          placeholder="Senha"
          maxLength={50}
          label="Senha"
        />
        <ButtonInput variant="save" title="Entrar" />
        <Link href="/signup" className="text-sm mx-auto">
          Criar conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
