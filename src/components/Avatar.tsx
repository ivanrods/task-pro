"use client";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
type AvatarProps = {
  alt?: string;
  size?: number;
  currentImage?: string;
  onUpload?: (base64: string) => void;
};

const Avatar = ({
  alt = "Avatar",
  size,
  currentImage,
  onUpload,
}: AvatarProps) => {
  const [preview, setPreview] = useState(currentImage || null);

  useEffect(() => {
    setPreview(currentImage || null);
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        const imageUrl = data.url;
        setPreview(imageUrl);
        onUpload?.(imageUrl);
      } else {
        console.error("Erro no upload", data.error);
      }
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
    }
  };

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <div className="rounded-full overflow-hidden w-full h-full ">
        <Image
          src={preview || "/profile.png"}
          alt={alt}
          width={size}
          height={size}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Botão de upload com ícone */}
      <label
        htmlFor="avatar-upload"
        className="absolute bottom-2 right-2 bg-[var(--primary-color)] p-1 rounded-full shadow-md cursor-pointer hover:bg-[var(--primary-color-dark)] transition text-white"
        title="Alterar foto"
      >
        <Camera className="w-8 h-8 p-1" />
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default Avatar;
