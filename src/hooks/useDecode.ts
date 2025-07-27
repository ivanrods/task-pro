import jwt from "jsonwebtoken";

type DecodedToken = {
  userId: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
};


export const getUserFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};

