export function useData(data?: string){

    function formatCurrentDate(): string {
        const [dia, mes, ano] = new Intl.DateTimeFormat("pt-BR")
          .format(new Date())
          .split("/");
        return `${ano}-${mes}-${dia}`;
      }
  
      const dataToday = formatCurrentDate();


      const dataFormatada =
      data && !isNaN(new Date(`${data}T00:00:00`).getTime())
        ? new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR")
        : "";


    return{ dataToday, dataFormatada }
}