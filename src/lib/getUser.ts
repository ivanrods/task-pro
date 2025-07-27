export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return { userId: payload?.userId || null };
  } catch (error) {
    console.error("Erro ao decodificar token:", error);
    return null;
  }
}
