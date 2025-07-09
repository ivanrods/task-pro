import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });
  return NextResponse.json({ user });
}
