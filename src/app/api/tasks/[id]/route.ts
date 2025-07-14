import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { title, description, data, completed, favorite } = body;

  try {
    const updated = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        data,
        completed,
        favorite,
      },
    });

    return NextResponse.json(updated);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar tarefa" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao deletar tarefa" },
      { status: 500 }
    );
  }
}
