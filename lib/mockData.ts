// lib/mockData.ts

export type SelectProduct = {
    id: number;
    imageUrl: string;
    name: string;
    status: string;
    price: string;
    stock: number;
    availableAt: Date;
  };
  
  export const sampleProducts: SelectProduct[] = [
    {
      id: 1,
      imageUrl: 'https://via.placeholder.com/64',
      name: 'Sample Product 1',
      status: 'active',
      price: '100.00',
      stock: 10,
      availableAt: new Date()
    },
    {
      id: 2,
      imageUrl: 'https://via.placeholder.com/64',
      name: 'Sample Product 2',
      status: 'draft',
      price: '200.00',
      stock: 20,
      availableAt: new Date()
    },
    // Add more sample products as needed
  ];