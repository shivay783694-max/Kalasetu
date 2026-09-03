import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function AdminArtisans() {
  const { artisans } = useAppData();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manage Artisans</h1>
        <p className="text-muted-foreground">View and manage all registered artisans on the platform.</p>
      </div>

      <div className="bg-white rounded-3xl border border-secondary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase tracking-widest border-b border-secondary">
              <tr>
                <th className="p-4 font-bold">Artisan</th>
                <th className="p-4 font-bold">Craft & Location</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Joined</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {artisans.map(artisan => (
                <tr key={artisan.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={artisan.profileImage} alt={artisan.name} className="w-10 h-10 rounded-full object-cover bg-muted" />
                      <div>
                        <p className="font-bold text-foreground">{artisan.name}</p>
                        <p className="text-xs text-muted-foreground">{artisan.mobile}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-foreground">{artisan.craftType}</p>
                    <p className="text-xs text-muted-foreground">{artisan.district}, {artisan.state}</p>
                  </td>
                  <td className="p-4">
                    <Badge variant={artisan.isVerified ? 'success' : 'warning'}>
                      {artisan.isVerified ? 'Verified' : 'Pending'}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {new Date(artisan.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                     <Button variant="outline" size="sm" className="h-8 text-[10px]">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
