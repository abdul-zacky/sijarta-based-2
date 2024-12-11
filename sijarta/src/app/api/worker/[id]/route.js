import { neon } from "@neondatabase/serverless";

export async function GET(req, { params }) {
  const { id } = params; // Extract `id` from the route params
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("Worker ID from params:", id);

    const workers = await sql`
      SELECT 
        P.nama, 
        K.rating, 
        K.jml_pesanan_selesai, 
        P.tgl_lahir, 
        P.alamat, 
        K.link_foto
      FROM sijarta.PEKERJA AS K
      JOIN sijarta.PENGGUNA AS P ON K.id = P.id
      WHERE K.id = ${id}
    `;

    if (workers.length == 0) {
      return new Response(JSON.stringify({ error: "Worker not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ worker: workers }), { status: 200 });
  } catch (error) {
    console.error("Error fetching worker:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
