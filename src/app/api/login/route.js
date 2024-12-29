import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

DATABASE_URL='postgresql://sijarta_owner:Wy6XorAz7HNe@ep-calm-water-a1mytz7y.ap-southeast-1.aws.neon.tech/sijarta?sslmode=require'

export async function POST(request) {
  try {
    const { phone, password } = await request.json();
    const sql = neon(process.env.DATABASE_URL);

    // Fetch user from pengguna
    const rows = await sql`
      SELECT id, nama, jenis_kelamin, no_hp, tgl_lahir, alamat, saldo_mypay
      FROM sijarta.pengguna
      WHERE no_hp = ${phone} AND pwd = ${password}
      LIMIT 1;
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = rows[0];

    // Check if user is a pekerja
    const pekerjaCheck = await sql`
      SELECT 1 FROM sijarta.pekerja WHERE id = ${user.id} LIMIT 1;
    `;

    // Check if user is a pelanggan
    const pelangganCheck = await sql`
      SELECT 1 FROM sijarta.pelanggan WHERE id = ${user.id} LIMIT 1;
    `;

    let role = 'Pengguna'; // Default role
    if (pekerjaCheck.length > 0) {
      role = 'Pekerja';
    } else if (pelangganCheck.length > 0) {
      role = 'Pelanggan'; // Or "Pelanggan" if that's your naming
    }

    return NextResponse.json({
      id: user.id,
      name: user.nama,
      gender: user.jenis_kelamin,
      phone: user.no_hp,
      birthDate: user.tgl_lahir,
      address: user.alamat,
      saldo_mypay: user.saldo_mypay,
      role: role
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}