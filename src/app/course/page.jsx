"use client";
import CoursesSection from "@/components/CoursesSection";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Course() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p); // ["courses"]

  return (
    <div className="mt-[80px] min-w-full">
      {/* Breadcrumb Navigation */}
      <div
                className="text-white px-6 py-8 flex justify-between items-center"
                style={{
                    backgroundImage: 'url("/images/red-dot-button-bg.jpeg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <h1 className="text-3xl font-bold">Our Courses</h1>
                <div className="bg-white text-black px-4 py-2 rounded-full shadow-md">
                    <Link href="/" className="text-red-700 font-bold">Home</Link>
                    {paths.map((p, i) => (
                        <span key={i} className="text-gray-600">
                            {" "} / {p.charAt(0).toUpperCase() + p.slice(1)}
                        </span>
                    ))}
                </div>
            </div>

      {/* Courses Section */}
      <CoursesSection />
    </div>
  );
}
