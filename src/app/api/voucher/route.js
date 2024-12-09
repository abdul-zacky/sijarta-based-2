import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const sql = neon(process.env.DATABASE_URL);

  try {

    const vouchers = await sql`
      SELECT 
        v.kode,
        d.potongan,
        d.min_tr_pemesanan AS minTransaksi,
        v.jml_hari_berlaku AS berlaku,
        v.kuota_penggunaan AS kuota,
        v.harga
      FROM sijarta.voucher v
      JOIN sijarta.diskon d ON v.kode = d.kode
      ORDER BY d.kode ASC;
    `;

    if (vouchers.length === 0) {
      return NextResponse.json({ error: 'No vouchers found' }, { status: 404 });
    }

    return NextResponse.json({ vouchers });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
