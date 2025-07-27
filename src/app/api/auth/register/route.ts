import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return NextResponse.json({ error: "Email já registrado" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  return NextResponse.json(
    { message: "Usuário criado", user },
    { status: 201 }
  );
}
