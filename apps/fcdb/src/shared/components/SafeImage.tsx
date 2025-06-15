"use client";
import Image from "next/image";
import { useState } from "react";

export default function SafeImage({ src, ...rest }: any) {
  const [imgSrc, setImgSrc] = useState(src);
  const fallback =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
    />
  );
}
