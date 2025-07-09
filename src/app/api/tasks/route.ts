import prisma from '@/app/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(req: NextRequest) {
  const userId = req.headers.get('user-id')

  if (!userId) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  const tasks = await prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(tasks)
}

export async function POST(req: NextRequest) {
   const body = await req.json();
  const { title, description, data, completed, favorite, userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "Usuário não autenticado" }, { status: 401 });
  }

  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      data,
      completed,
      favorite,
      userId,
    },
  })

  return NextResponse.json(newTask, { status: 201 });
}
