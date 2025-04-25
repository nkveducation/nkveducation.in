"use client";
import CoursesSection from "@/components/CoursesSection";
import Breadcrumbs from "@/components/Breadcrumbs";


export default function Course() {
  return (
    <Suspense fallback={<div>Loading courses...</div>}>
      <CourseContent />
    </Suspense>
  );
}

export function CourseContent() {
  return (
    <div className="mt-[80px] min-w-full">
      <div className="text-white px-6 py-8 flex flex-col md:flex-row justify-between items-center" style={{ background: 'linear-gradient(to right, #dc2626, #b91c1c)' }}>
        <h1 className="text-3xl font-bold">Our Courses</h1>
        <Breadcrumbs />
      </div>
      <CoursesSection />
    </div>
  );
}