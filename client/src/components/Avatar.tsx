import React from "react";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
  title?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, className, title }) => {
  return <img src={src} alt={alt} className={`${className}`} title={title} />;
};

export default Avatar;
