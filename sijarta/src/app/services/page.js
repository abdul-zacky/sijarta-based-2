"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.kategori_jasa);
        setSubcategories(data.subkategori_jasa);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nama_kategori}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Search Subcategory</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Type to search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        {categories.map((category) => {
          const filteredSubs = subcategories.filter(sub => 
            sub.kategori_jasa_id === category.id &&
            (searchTerm ? sub.nama_subkategori.toLowerCase().includes(searchTerm.toLowerCase()) : true)
          );

          return (
            <div key={category.id} className="mb-6">
              <h2 className="text-xl font-bold text-black border-b pb-2 mb-4" style={{ textTransform: 'capitalize' }}>{category.nama_kategori}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredSubs.length > 0 ? filteredSubs.map((sub, subIndex) => (
                  <Link key={subIndex} href={`/subcategory/${category.id}/${sub.id}`} className="block">
                    <div className="border border-gray-200 bg-blue-600 rounded-lg p-4 text-center text-white hover:bg-blue-700 transition" style={{ textTransform: 'capitalize' }}>
                      {sub.nama_subkategori}
                    </div>
                  </Link>
                )) : (
                  <div className="col-span-full text-center text-gray-500">No services for this category yet.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// import Link from "next/link"; // Import Link

// export default function HomePage() {
//   const categories = [
//     { name: "Kategori Jasa 1", subcategories: ["Subkategori Jasa 1", "Subkategori Jasa 2", "Subkategori Jasa 3"] },
//     { name: "Kategori Jasa 2", subcategories: ["Subkategori Jasa 1", "Subkategori Jasa 2", "Subkategori Jasa 3"] },
//     { name: "Kategori Jasa 3", subcategories: ["Subkategori Jasa 1", "Subkategori Jasa 2", "Subkategori Jasa 3"] },
//   ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <div className="flex flex-wrap gap-4 mb-6 bg-gray-100 p-4 rounded-lg shadow">
//         <div className="w-full md:w-1/3">
//           <label className="block mb-2 text-sm font-medium text-gray-700">Kategori</label>
//           <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300">
//             <option value="">Semua</option>
//             <option value="1">Kategori Jasa 1</option>
//             <option value="2">Kategori Jasa 2</option>
//             <option value="3">Kategori Jasa 3</option>
//           </select>
//         </div>
//         <div className="w-full md:w-2/3">
//           <label className="block mb-2 text-sm font-medium text-gray-700">Nama Subkategori</label>
//           <input
//             type="text"
//             placeholder="Cari subkategori..."
//             className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
//           />
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow">
//         {categories.map((category, categoryIndex) => (
//           <div key={categoryIndex} className="mb-6">
//             <h2 className="text-xl font-bold text-black border-b pb-2 mb-4">{category.name}</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {category.subcategories.map((sub, subIndex) => (
//                 <Link
//                   key={subIndex}
//                   href={`/subcategory/${categoryIndex + 1}/${subIndex + 1}`}
//                   className="block"
//                 >
//                   <div className="border border-gray-200 bg-blue-600 rounded-lg p-4 text-center hover:bg-blue-700 transition">
//                     {sub}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
