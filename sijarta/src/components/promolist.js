"use client";

const promos = [
  { kode: 'PRM10', akhirBerlaku: '2024-12-31' },
  { kode: 'PRM50', akhirBerlaku: '2025-01-15' },
];

export default function PromoList() {
  return (
    <div className="space-y-4">
      {promos.map((promo, index) => (
        <div
          key={index}
          className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 items-center bg-gray-50 p-4 rounded-lg shadow-md"
        >
          <p className="text-center">{promo.kode}</p>
          <p className="text-center">{promo.akhirBerlaku}</p>
        </div>
      ))}
    </div>
  );
}
