import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { title, description, data, completed, favorite } = body;

  try {
    const updated = await prisma.updated({
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
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 });
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
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 });
  }
}
