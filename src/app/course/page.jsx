"use client";
import CoursesSection from "@/components/CoursesSection";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Course() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((p) => p); // ["courses"]

  return (
    <div className="mt-[80px] min-w-full">
      {/* Breadcrumb Navigation */}
      <div
        className="text-white px-6 py-8 flex flex-col md:flex-row justify-between items-center"
        style={{
          background: 'linear-gradient(to right, #dc2626, #b91c1c)',
        }}
      >
          <h1 className="text-3xl font-bold">Our Courses</h1>
                <Suspense fallback={<div>Loading breadcrumbs...</div>}>
                    <Breadcrumbs />
                </Suspense>
        
              </div>

      {/* Courses Section */}
      <CoursesSection />
    </div>
  );
}
