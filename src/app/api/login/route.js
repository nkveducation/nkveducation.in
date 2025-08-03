// app/api/login/route.js
import { NextResponse } from 'next/server';

const PRESET_USER = { username: 'nkveducation@admin', password: 'nkveducation@dev' }; // **Pre-set Credentials**

export async function POST(req) {
    const { username, password } = await req.json();

    if (username === PRESET_USER.username && password === PRESET_USER.password) {
        return NextResponse.json({ success: true }); // सिर्फ success भेजें
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
