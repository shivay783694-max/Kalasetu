import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { ShieldCheck, MapPin, Edit, Eye, User, Image as ImageIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

export default function Profile() {
  const { artisans, products, updateArtisan } = useAppData();
  const { addToast } = useToast();
  const artisanId = 'a1';
  const artisan = artisans.find(a => a.id === artisanId)!;
  const myProductsCount = products.filter(p => p.artisanId === artisanId).length;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: artisan.name,
    mobile: artisan.mobile,
    craftType: artisan.craftType,
    state: artisan.state,
    district: artisan.district,
    about: artisan.about
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.mobile) newErrors.mobile = 'Mobile is required';
    if (!formData.about) newErrors.about = 'About section is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateArtisan(artisanId, formData);
    setIsEditModalOpen(false);
    addToast('Profile updated successfully', 'success');
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your artisan public identity.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setIsEditModalOpen(true)}>
            <Edit size={16} /> Edit Profile
          </Button>
          <Button variant="accent" className="gap-2 shadow-none">
            <Eye size={16} /> View Store
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-secondary overflow-hidden">
        {/* Cover Photo */}
        <div className="h-48 bg-muted relative">
          <ImageWithFallback 
            src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Banarasi_Silk_Saree.jpg" 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Profile Info */}
        <div className="p-8 relative">
          <div className="absolute -top-16 left-8">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-muted">
              {artisan.profileImage ? (
                <ImageWithFallback src={artisan.profileImage} alt={artisan.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground">
                  <User size={48} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 sm:mt-0 sm:ml-40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  {artisan.name}
                  {artisan.isVerified && <ShieldCheck size={20} className="text-success" />}
                </h2>
                <p className="text-muted-foreground flex items-center gap-1.5 mt-1">
                  <MapPin size={16} /> {artisan.district}, {artisan.state}
                </p>
              </div>
              <Badge variant={artisan.isVerified ? 'success' : 'outline'} className="w-fit h-fit py-1.5 px-3">
                {artisan.isVerified ? 'Verified Artisan' : 'Verification Pending'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-secondary my-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Craft</p>
                <p className="font-bold">{artisan.craftType}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Products</p>
                <p className="font-bold">{myProductsCount}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Joined</p>
                <p className="font-bold">{new Date(artisan.joinedAt).getFullYear()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Mobile</p>
                <p className="font-bold">{artisan.mobile}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-2">About Me</h3>
              <p className="text-muted-foreground leading-relaxed max-w-3xl">
                {artisan.about || "No description provided yet."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        maxWidth="max-w-2xl"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            <Button variant="default" onClick={handleSave}>Save Changes</Button>
          </div>
        }
      >
        <form className="space-y-5" onSubmit={handleSave}>
          <div className="flex gap-6 items-center pb-6 border-b border-secondary">
            <div className="w-24 h-24 rounded-full bg-muted overflow-hidden flex items-center justify-center shrink-0">
               <ImageWithFallback src={artisan.profileImage} alt={artisan.name} className="w-full h-full object-cover" />
            </div>
            <Button variant="outline" type="button" className="gap-2 text-[10px]">
              <ImageIcon size={14} /> Change Photo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input 
              label="Full Name" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              error={errors.name}
            />
            <Input 
              label="Mobile Number" 
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              error={errors.mobile}
            />
          </div>
          
          <Input 
            label="Craft Type" 
            value={formData.craftType}
            onChange={(e) => setFormData({...formData, craftType: e.target.value})}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input 
              label="State" 
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value})}
            />
            <Input 
              label="District" 
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
            />
          </div>

          <Textarea 
            label="About Your Craft" 
            rows={4}
            value={formData.about}
            onChange={(e) => setFormData({...formData, about: e.target.value})}
            error={errors.about}
            placeholder="Tell buyers about your experience, techniques, and the story behind your craft."
          />
        </form>
      </Modal>
    </div>
  );
}
