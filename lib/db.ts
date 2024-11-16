// lib/db.ts

import { sampleProducts, SelectProduct } from './mockData';

export async function getProducts(
  search: string,
  offset: number
): Promise<{
  products: SelectProduct[];
  newOffset: number | null;
  totalProducts: number;
}> {
  // Filter products based on the search query
  const filteredProducts = sampleProducts.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Paginate the filtered products
  const paginatedProducts = filteredProducts.slice(offset, offset + 5);
  const newOffset = paginatedProducts.length >= 5 ? offset + 5 : null;

  return {
    products: paginatedProducts,
    newOffset,
    totalProducts: filteredProducts.length
  };
}