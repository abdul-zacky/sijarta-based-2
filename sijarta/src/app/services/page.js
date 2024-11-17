// src/app/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link'; // Import Link here

export default function HomePage() {
  const categories = [
    { name: 'Kategori Jasa 1', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
    { name: 'Kategori Jasa 2', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
    { name: 'Kategori Jasa 3', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <div>
          <label>Kategori</label>
          <select>
            <option value="">Semua</option>
            <option value="1">Kategori Jasa 1</option>
            <option value="2">Kategori Jasa 2</option>
            <option value="3">Kategori Jasa 3</option>
          </select>
        </div>
        <input type="text" placeholder="Nama Subkategori" />
      </div>
      <div>
      {categories.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h2>{category.name}</h2>
            {category.subcategories.map((sub, subIndex) => (
              <Link
                key={subIndex}
                href={`/subcategory/${categoryIndex + 1}/${subIndex + 1}`}
              >
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "5px",
                  }}
                >
                  {sub}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
