import clsx, { type ClassValue } from "clsx";
import Image, { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IZodiacalButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  image?: StaticImageData;
}

export default function ZodiacalButton({
  className,
  label,
  image,
  ...props
}: IZodiacalButton) {
  return (
    <button
      {...props}
      type="button"
      className={cn(
        "rounded-md px-3.5 py-2.5 text-[17.8px] font-semibold whitespace-nowrap border-2 border-yellow-600 text-yellow-600 w-full overflow-hidden",
        className
      )}
    >
      {label}

      {image ? (
        <div className="relative w-28 h-28 mx-auto transform-gpu scale-[2]">
          <Image fill alt="" src={image} style={{ objectFit: "cover" }} />
        </div>
      ) : null}
    </button>
  );
}
