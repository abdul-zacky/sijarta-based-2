// app/api/login/route.js
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request) {
  const { phone, password } = await request.json();
  const sql = neon(process.env.DATABASE_URL);

  const rows = await sql`
    SELECT id, nama, no_hp FROM sijarta.pengguna
    WHERE no_hp = ${phone} AND pwd = ${password}
    LIMIT 1
  `;

  if (rows.length > 0) {
    const user = rows[0];
    // Here you could set a secure cookie or session token for persistent login.
    // For demonstration, just return user data:
    return NextResponse.json({ id: user.id, name: user.nama, phone: user.no_hp });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}