import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  // Converte para buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Garante que vai salvar na pasta public/uploads
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "uploads", fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/${fileName}`;

  return NextResponse.json({ url });
}
