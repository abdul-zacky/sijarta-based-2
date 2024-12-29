import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('id');

  if (!userId) {
    return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL);
  
  // Fetch user data from pengguna
  const userRows = await sql`
    SELECT p.id, p.nama, p.no_hp, p.alamat, pk.nama_bank, pk.nomor_rekening, pk.npwp, COALESCE(pk.rating, 0) AS rating, COALESCE(pk.jml_pesanan_selesai, 0) AS jml_pesanan_selesai
    FROM sijarta.pengguna p
    LEFT JOIN sijarta.pekerja pk ON pk.id = p.id
    WHERE p.id = ${userId}
    LIMIT 1;
  `;

  if (userRows.length === 0) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = userRows[0];
  const role = user.nama_bank ? 'Pekerja' : 'Pengguna';

  return NextResponse.json({
    id: user.id,
    name: user.nama,
    phone: user.no_hp,
    address: user.alamat,
    bankName: user.nama_bank || '',
    accountNumber: user.nomor_rekening || '',
    npwp: user.npwp || '',
    rating: user.rating,
    jml_pesanan_selesai: user.jml_pesanan_selesai,
    role: role,
  });
}

export async function POST(request) {
  const data = await request.json();
  const { id, role, phone, address, bankName, accountNumber, npwp } = data;

  if (!id) {
    return NextResponse.json({ error: 'User ID not provided' }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL);

  // Update pengguna table
  await sql`
    UPDATE sijarta.pengguna
    SET no_hp = ${phone}, alamat = ${address}
    WHERE id = ${id}
  `;

  if (role === 'Pekerja') {
    // Update pekerja table
    await sql`
      UPDATE sijarta.pekerja
      SET nama_bank = ${bankName}, nomor_rekening = ${accountNumber}, npwp = ${npwp}
      WHERE id = ${id}
    `;
  }

  return NextResponse.json({ success: true });
}