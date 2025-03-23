'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const isAuth = localStorage.getItem('authenticated'); // **Check Authentication**
        if (isAuth !== 'true') {
            router.push('/login'); // **अगर लॉगिन नहीं है तो Redirect करें**
        } else {
            setAuthenticated(true);
        }
    }, []);

    async function handleLogout() {
        const res = await fetch('/api/logout', { method: 'POST' });

        if (res.ok) {
            localStorage.removeItem('authenticated'); // **Logout करें**
            router.push('/login');
        }
    }

    if (!authenticated) return <p>Loading...</p>;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl mb-4">Welcome to Dashboard</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded"
            >
                Logout
            </button>
            
        </div>
    );
}
