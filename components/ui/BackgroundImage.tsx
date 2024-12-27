import React from "react";
import Image from "next/image";

type BackgroundImageProps = {
  className?: string;
  src: string;
  children: React.ReactNode;
};

const BackgroundImage = ({
  className = "",
  src,
  children,
}: BackgroundImageProps) => {
  return (
    <div className={`relative z-[1] ${className}`}>
      <Image
        src={src}
        alt="Background"
        loading="lazy"
        fill
        className="object-fit z-[-2]"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-[-1]"></div>
      {children}
    </div>
  );
};

export default BackgroundImage;
