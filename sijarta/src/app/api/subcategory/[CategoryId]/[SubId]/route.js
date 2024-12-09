import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req, { params }) {
  const sql = neon(process.env.DATABASE_URL);

  // Resolve params properly
  const { CategoryId: categoryId, SubId: subId } = params;

  console.log("Resolved categoryId:", categoryId);
  console.log("Resolved subId:", subId);

  if (!categoryId || !subId) {
    return NextResponse.json(
      { error: "Missing categoryId or subId" },
      { status: 400 }
    );
  }

  try {
    // Fetch category, subcategory, and sessions
    const [kategoriJasa] = await sql`SELECT * FROM sijarta.KATEGORI_JASA WHERE id = ${categoryId}`;
    const [subkategoriJasa] = await sql`SELECT * FROM sijarta.SUBKATEGORI_JASA WHERE id = ${subId}`;
    const sesiLayanan = await sql`SELECT * FROM sijarta.SESI_LAYANAN WHERE subkategori_id = ${subId}`;
    const daftarPekerja = await sql`
    SELECT U.nama 
    FROM sijarta.PEKERJA_KATEGORI_JASA K
    JOIN sijarta.PEKERJA P ON P.id = K.pekerja_id
    JOIN sijarta.PENGGUNA U ON P.id = U.id
    WHERE kategori_jasa_id = ${categoryId}
    `;
    const daftarTestimoni = await sql`
    SELECT U.nama, T.tgl, T.teks, T.rating, PU.nama AS pekerja_nama
    FROM sijarta.TESTIMONI T 
    JOIN sijarta.TR_PEMESANAN_JASA J ON J.id = T.id_tr_pemesanan
    JOIN sijarta.PENGGUNA U ON U.id = J.id_pelanggan
    JOIN sijarta.PEKERJA P ON P.id = J.id_pekerja
    JOIN sijarta.PENGGUNA PU ON PU.id = P.id
    WHERE J.id_kategori_jasa = ${subId}
    `;

    if (!kategoriJasa || !subkategoriJasa) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({
      kategori_jasa: kategoriJasa,
      subkategori_jasa: subkategoriJasa,
      sesi_layanan: sesiLayanan,
      daftar_pekerja: daftarPekerja,
      daftar_testimoni: daftarTestimoni
    });
  } catch (error) {
    console.error("Error accessing the database2:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
