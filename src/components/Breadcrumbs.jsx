"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p);

  return (
    <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
      <Link href="/" className="text-red-700 font-bold">Home</Link>
      {paths.map((p, i) => (
        <span key={i} className="text-gray-600"> / {p.charAt(0).toUpperCase() + p.slice(1)}</span>
      ))}
    </div>
  );
}
