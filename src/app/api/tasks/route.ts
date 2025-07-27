import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  try {
    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar tarefas" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const userId = req.headers.get("user-id");

  if (!userId) {
    return NextResponse.json(
      { error: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const {
    title,
    description,
    data,
    completed = false,
    favorite = false,
  } = body;

  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        data,
        completed,
        favorite,
        userId,
      },
    });

    return NextResponse.json(newTask, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao criar tarefa" },
      { status: 500 }
    );
  }
}
