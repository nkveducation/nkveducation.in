"use client"

import { ModeToggle } from "@/components/ModeToggle";
import SearchEmployee, { StudentSearch, TeacherSearchResults } from "@/components/Search";


export default function Home() {
  return (
    <div>
      <ModeToggle />
      <SearchEmployee />
      <TeacherSearchResults/>
      <StudentSearch />
    </div>
  );
}
