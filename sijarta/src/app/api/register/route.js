import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request) {
  const data = await request.json();
  const { role, name, password, gender, phone, birthDate, address, bankName, accountNumber, npwp, photoUrl } = data;
  
  const sql = neon(process.env.DATABASE_URL);
  
  // Check if phone is unique
  const phoneCheck = await sql`
    SELECT 1 FROM sijarta.pengguna WHERE no_hp = ${phone} LIMIT 1;
  `;
  if (phoneCheck.length > 0) {
    return NextResponse.json({ error: 'Phone number already registered.' }, { status: 400 });
  }

  // If pekerja, check npwp
  if (role === "Pekerja") {
    const npwpCheck = await sql`
      SELECT 1 FROM sijarta.pekerja WHERE npwp = ${npwp} LIMIT 1;
    `;
    if (npwpCheck.length > 0) {
      return NextResponse.json({ error: 'NPWP already registered.' }, { status: 400 });
    }
  }

  const userId = crypto.randomUUID();

  // Insert into pengguna
  await sql`
    INSERT INTO sijarta.pengguna (id, nama, jenis_kelamin, no_hp, pwd, tgl_lahir, alamat, saldo_mypay)
    VALUES (${userId}, ${name}, ${gender}, ${phone}, ${password}, ${birthDate}, ${address}, 0)
  `;

  // If role is pekerja, insert into pekerja table
  if (role === "Pekerja") {
    await sql`
      INSERT INTO sijarta.pekerja (id, nama_bank, nomor_rekening, npwp, link_foto, rating, jml_pesanan_selesai)
      VALUES (${userId}, ${bankName}, ${accountNumber}, ${npwp}, ${photoUrl}, 0, 0)
    `;
  } else {
    // If Pengguna, insert into pelanggan
    await sql`
      INSERT INTO sijarta.pelanggan (id, level)
      VALUES (${userId}, 'Bronze')
    `;
  }

  // Return the created user
  return NextResponse.json({ 
    id: userId, 
    name, 
    gender, 
    phone, 
    birthDate, 
    address, 
    saldo_mypay: 0 
  });
}