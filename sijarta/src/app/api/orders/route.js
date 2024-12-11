import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('id');

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not logged in" }), { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log("Yay : ", user)
    const orders = await sql` 
      SELECT J.id, J.sesi, J.total_biaya, P.nama AS pekerja_nama, SP.status
      FROM sijarta.TR_PEMESANAN_JASA J
      JOIN sijarta.TR_PEMESANAN_STATUS TS ON TS.id_tr_pemesanan = J.id
      JOIN sijarta.STATUS_PESANAN SP ON SP.id = TS.id_status
      JOIN sijarta.PEKERJA K ON K.id = J.id_pekerja
      JOIN sijarta.PENGGUNA P ON P.id = K.id
      WHERE J.id_pelanggan = ${user}
      ORDER BY J.tgl_pemesanan DESC;
    `;

    if (orders.length >= 0) {
      console.log("Order Found for : ", user)
      return new NextResponse(JSON.stringify({ orders }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "No orders found" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
