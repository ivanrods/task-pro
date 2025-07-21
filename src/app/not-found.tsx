import Link from "next/link";

export default function Example() {
  return (
    <>
      <main className="grid min-h-full place-items-center bg-[var(--background)] px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[var(--text-color)]">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-[var(--text-color)] sm:text-7xl">
           Página não encontrada
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-[var(--border-color)] sm:text-xl/8">
           Desculpe, não conseguimos encontrar a página que você está procurando.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-[var(--primary-color)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--primary-color)]focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
            >
              Voltar
            </Link>
            <a href="https://www.linkedin.com/in/ivanrods/" className="text-sm font-semibold text-[var(--text-color)]">
              Entre em contato com o suporte <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
