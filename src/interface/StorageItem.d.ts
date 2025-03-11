// storage.type.ts

export interface StorageItem {
    id: number;
    sku: string;
    name: string;
    description: string;
    category: string;
    quantity: number;
    unit: string;
    entryDate: string;
    expiryDate: string;
    supplier: string;
    purchasePrice: number;
    salePrice: number;
    location: string;
    reorderLevel: number;
    status: string;
    notes: string;
    equipmentId: number | null; // Vinculación, se establece en null
  }
  