import jwt from "jsonwebtoken";

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as { userId: string };
    return decoded;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};

