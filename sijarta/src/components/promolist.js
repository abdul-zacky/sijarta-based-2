"use client";

export default function PromoList({ promos }) {
  if (!promos || promos.length === 0) {
    return <p>No active promos available</p>; 
  }

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
