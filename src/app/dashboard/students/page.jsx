'use client';

import AddStudent from './form/page';
import StudentsList from './components/students-list';

export default function Student() {
    return (
        <div>
            <AddStudent />
            <StudentsList />
        </div>
    )
}
