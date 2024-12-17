import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user = searchParams.get('id');
  const timestamp = searchParams.get("t");

  console.log("Fetching orders for user ID:", user, "at timestamp:", timestamp);

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not logged in" }), { status: 401 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    console.log("Yay : ", user)
    const orders = await sql` SELECT 
    SJ.nama_subkategori,
    J.id,
    J.sesi,
    J.total_biaya,
    P.nama AS pekerja_nama,
    SP.status
    FROM sijarta.TR_PEMESANAN_JASA J
    LEFT JOIN sijarta.SUBKATEGORI_JASA SJ ON J.id_kategori_jasa = SJ.id
    LEFT JOIN sijarta.TR_PEMESANAN_STATUS TS ON TS.id_tr_pemesanan = J.id
    LEFT JOIN sijarta.STATUS_PESANAN SP ON SP.id = TS.id_status
    LEFT JOIN sijarta.PEKERJA K ON K.id = J.id_pekerja
    LEFT JOIN sijarta.PENGGUNA P ON P.id = K.id
    WHERE J.id_pelanggan = ${user}
    ORDER BY J.tgl_pemesanan DESC;`;

    if (orders.length >= 0) {
      console.log("Order Found for : ", user)
      console.log("Fetched Orders from Database:", orders);
      console.log("Database Query:", sql);
      return new NextResponse(JSON.stringify({ orders }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: "No orders found" }), { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const {
      tgl_pemesanan,
      tgl_pekerjaan,
      waktu_pekerjaan,
      total_biaya,
      id_pelanggan,
      id_pekerja,
      id_kategori_jasa,
      sesi,
      id_diskon,
      id_metode_bayar,
    } = await req.json();

    const result = await sql`
      INSERT INTO sijarta.tr_pemesanan_jasa (
        id,
        tgl_pemesanan,
        tgl_pekerjaan,
        waktu_pekerjaan,
        total_biaya,
        id_pelanggan,
        id_pekerja,
        id_kategori_jasa,
        sesi,
        id_diskon,
        id_metode_bayar
      )
      VALUES (
        gen_random_uuid(),
        ${tgl_pemesanan},
        CURRENT_DATE,
        '00:00:00'::time + CURRENT_DATE,
        ${total_biaya},
        ${id_pelanggan},
        ${id_pekerja || null},
        ${id_kategori_jasa},
        ${sesi},
        ${id_diskon || null},
        ${id_metode_bayar}
      )
      RETURNING id;
    `;

    return NextResponse.json({ message: "Order saved successfully", id: result[0].id });
  } catch (error) {
    console.error("Error saving order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}