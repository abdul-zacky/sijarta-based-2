import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Fetch active promos
    const promos = await sql`
      SELECT 
        p.kode,
        d.potongan,
        d.min_tr_pemesanan AS minTransaksi,
        p.tgl_akhir_berlaku AS akhirBerlaku
      FROM sijarta.promo p
      JOIN sijarta.diskon d ON p.kode = d.kode
      WHERE p.tgl_akhir_berlaku >= CURRENT_DATE
      ORDER BY p.tgl_akhir_berlaku ASC;
    `;

    if (promos.length === 0) {
      return NextResponse.json({ error: 'No active promos found' }, { status: 404 });
    }

    return NextResponse.json({ promos });
  } catch (error) {
    // Print out the full error object for debugging
    console.error('Error fetching promos:', error); // This logs the full error
    return NextResponse.json({ error: 'Internal server error', details: error.message || error }, { status: 500 });
  }
}
