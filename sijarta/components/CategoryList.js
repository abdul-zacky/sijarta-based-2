// src/app/components/CategoryList.js
import Link from 'next/link';

export default function CategoryList() {
  const categories = [
    { name: 'Kategori Jasa 1', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
    { name: 'Kategori Jasa 2', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
    { name: 'Kategori Jasa 3', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
  ];

  return (
    <div>
      {categories.map((category, index) => (
        <div key={index}>
          <h2>{category.name}</h2>
          {category.subcategories.map((sub, i) => (
            <Link key={i} href={`/subcategory/${i + 1}`}>
              <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '5px' }}>{sub}</div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
