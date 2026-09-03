import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function AdminProducts() {
  const { products, artisans } = useAppData();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Products</h1>
        <p className="text-muted-foreground">Monitor catalog and listings.</p>
      </div>

      <div className="bg-white rounded-3xl border border-secondary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest border-b border-secondary">
              <tr>
                <th className="p-4 font-bold">Product</th>
                <th className="p-4 font-bold">Artisan</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {products.map(product => {
                const artisan = artisans.find(a => a.id === product.artisanId);
                return (
                  <tr key={product.id} className="hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt={product.title} className="w-10 h-10 rounded-lg object-cover bg-muted shrink-0" />
                        <div className="max-w-[200px]">
                          <p className="font-bold text-foreground truncate">{product.title}</p>
                          <p className="text-xs text-muted-foreground">₹{product.priceMin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-foreground">{artisan?.name || 'Unknown'}</p>
                    </td>
                    <td className="p-4">
                       <span className="text-xs uppercase tracking-widest">{product.category}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant={product.status === 'published' ? 'success' : 'outline'}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                       <Button variant="outline" size="sm" className="h-8 text-[10px]">View</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
