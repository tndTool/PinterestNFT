import React from "react";

type AvatarProps = {
  src: string;
  alt: string;
  className?: string;
  title?: string;
  onClick?: () => void;
};

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  className,
  title,
  onClick,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`${className}`}
      title={title}
      onClick={onClick}
    />
  );
};

export default Avatar;
