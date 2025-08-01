import type { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/lib/cloudinary";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "Erro ao processar o arquivo" });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const filepath = file.filepath;

    try {
      const uploadResult = await cloudinary.uploader.upload(filepath, {
        folder: "profile-images",
      });

      return res.status(200).json({ url: uploadResult.secure_url });
    } catch (error) {
      console.error("Erro ao fazer upload no Cloudinary:", error);
      return res.status(500).json({ error: "Erro ao fazer upload da imagem" });
    } finally {
      fs.unlink(filepath, () => {});
    }
  });
}
