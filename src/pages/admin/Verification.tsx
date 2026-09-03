import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export default function AdminVerification() {
  const { artisans, updateArtisan } = useAppData();
  const { addToast } = useToast();
  
  const pendingArtisans = artisans.filter(a => !a.isVerified);

  const handleVerify = (id: string) => {
    updateArtisan(id, { isVerified: true });
    addToast('Artisan verified successfully', 'success');
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pending Verifications</h1>
        <p className="text-muted-foreground">Review artisan applications for marketplace access.</p>
      </div>

      {pendingArtisans.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-secondary border-dashed">
          <div className="w-16 h-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
             <span className="material-symbols-outlined text-2xl font-bold text-success">✓</span>
          </div>
          <h3 className="text-lg font-bold mb-2">All Caught Up</h3>
          <p className="text-muted-foreground">There are no pending artisan verifications.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingArtisans.map(artisan => (
            <div key={artisan.id} className="bg-white rounded-3xl border border-secondary p-6">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                     <img src={artisan.profileImage} alt="" className="w-12 h-12 rounded-full bg-muted object-cover" />
                     <div>
                       <h3 className="font-bold text-lg">{artisan.name}</h3>
                       <p className="text-xs text-muted-foreground">{artisan.mobile}</p>
                     </div>
                  </div>
                  <Badge variant="warning">Pending</Badge>
               </div>
               
               <div className="space-y-3 mb-6 bg-muted/30 p-4 rounded-xl border border-secondary/50">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Craft Type</p>
                    <p className="text-sm font-bold">{artisan.craftType}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-bold">{artisan.district}, {artisan.state}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">About</p>
                    <p className="text-sm line-clamp-2">{artisan.about || 'No details provided.'}</p>
                  </div>
               </div>

               <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 text-[10px] h-10 border-error text-error hover:bg-error/10">Reject</Button>
                  <Button variant="default" className="flex-1 text-[10px] h-10 bg-success hover:bg-success/90 border-transparent text-white" onClick={() => handleVerify(artisan.id)}>Approve</Button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
