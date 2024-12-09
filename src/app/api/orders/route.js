import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('id');
  // const { user } = req; // Make sure user is passed in the request context

  if (!user || !user.id) {
    return new NextResponse(JSON.stringify({ error: "User not logged in" }), { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const orders = await sql`
      SELECT * FROM sijarta.tr_pemesanan_jasa
      WHERE id_pelanggan = ${user.id}
      ORDER BY tgl_pemesanan DESC
    `;

    if (orders.length > 0) {
      return new NextResponse(JSON.stringify({ orders }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "No orders found" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
