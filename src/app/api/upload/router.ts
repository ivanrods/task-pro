import formidable from "formidable";
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public", "uploads");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end("Method not allowed");

  // Cria pasta uploads se não existir
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({ uploadDir, keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Erro no upload" });

    const uploadedFile = files.file;

    const file = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;
    if (!file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const filename = path.basename(file.filepath);
    const imageUrl = `/uploads/${filename}`;

    // Aqui você pode salvar `imageUrl` no banco com o `userId`
    res.status(200).json({ url: imageUrl });
  });
}
