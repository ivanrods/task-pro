import Image from "next/image";
type AvatarProps = {
  src: string;
  alt?: string;
  size?: number;
};

const Avatar = ({ src, alt = "Avatar", size }: AvatarProps) => {
  return (
    <div
      className="rounded-full overflow-hidden"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
};

export default Avatar;
