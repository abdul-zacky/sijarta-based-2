// src/app/api/services/route.js

import { NextResponse } from 'next/server';
import { neon } from "@neondatabase/serverless";

export async function GET(req) {
    // const { searchParams } = new URL(req.url);
    const sql = neon(process.env.DATABASE_URL);

    try {
        const kategoriJasa = await sql`SELECT * FROM sijarta.KATEGORI_JASA;`;
        const subkategoriJasa = await sql`SELECT * FROM sijarta.SUBKATEGORI_JASA;`;
        return new NextResponse(JSON.stringify({
            kategori_jasa: kategoriJasa,
            subkategori_jasa: subkategoriJasa
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error accessing the database1:", error.message);
        return new NextResponse(JSON.stringify({ error: 'Data not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
