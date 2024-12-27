import React from "react";
import Link from "next/link";
import Image from "next/image";

type LogoProps = {
  className?: string;
};

const Logo = ({ className = "" }: LogoProps) => {
  return (
    <Link href={"/"} className={`block ${className}`}>
      <Image
        src={"/images/logo.webp"}
        loading="lazy"
        width={180}
        height={150}
        alt="Logo"
      />
    </Link>
  );
};

export default Logo;
