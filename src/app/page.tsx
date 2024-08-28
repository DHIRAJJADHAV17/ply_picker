import Image from "next/image";

export default function Home() {
  return (
    <Image
      src="/okyoicker.webp"
      alt="Vercel Logo"
      className="dark:invert"
      width={400}
      height={400}
      priority
    />
  );
}
