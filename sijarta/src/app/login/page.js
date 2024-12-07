import { neon } from '@neondatabase/serverless';

export default async function PenggunaPage() {
  const sql = neon(process.env.DATABASE_URL);

  // Fetch all pengguna rows
  const rows = await sql`SELECT * FROM sijarta.pengguna`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Pengguna</h1>
      {rows.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nama</th>
              <th className="border border-gray-300 px-4 py-2">Jenis Kelamin</th>
              <th className="border border-gray-300 px-4 py-2">No HP</th>
              <th className="border border-gray-300 px-4 py-2">Pwd</th>
              <th className="border border-gray-300 px-4 py-2">Tgl Lahir</th>
              <th className="border border-gray-300 px-4 py-2">Alamat</th>
              <th className="border border-gray-300 px-4 py-2">Saldo MyPay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((pengguna) => (
              <tr key={pengguna.id}>
                <td className="border border-gray-300 px-4 py-2">{pengguna.id}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.nama}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.jenis_kelamin}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.no_hp}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.pwd}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.tgl_lahir?.toLocaleDateString()}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.alamat}</td>
                <td className="border border-gray-300 px-4 py-2">{pengguna.saldo_mypay}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}