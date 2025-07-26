export function getDataToday(): string {
  const [dia, mes, ano] = new Intl.DateTimeFormat("pt-BR")
    .format(new Date())
    .split("/");
  return `${ano}-${mes}-${dia}`;
}

export function formatData(data?: string): string {
  if (data && !isNaN(new Date(`${data}T00:00:00`).getTime())) {
    return new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
  }

  return "";
}
