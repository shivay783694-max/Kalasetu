import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Camera, Image as ImageIcon, Sparkles, CheckCircle2, Circle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAppData } from '../../context/AppDataContext';
import { useToast } from '../../context/ToastContext';
import { ImageWithFallback } from '../../components/ui/ImageWithFallback';

type Step = 'upload' | 'processing' | 'review';

export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useAppData();
  const { addToast } = useToast();
  const [step, setStep] = useState<Step>('upload');
  const [image, setImage] = useState<string | null>(null);
  const [processingStage, setProcessingStage] = useState(0);

  const stages = [
    "Reading product image...",
    "Identifying craft type & origin...",
    "Creating engaging English & Hindi descriptions...",
    "Analyzing market to suggest fair price...",
    "Preparing your complete product listing..."
  ];

  // Mock processing simulation
  useEffect(() => {
    if (step === 'processing') {
      let currentStage = 0;
      const interval = setInterval(() => {
        currentStage++;
        setProcessingStage(currentStage);
        if (currentStage >= stages.length) {
          clearInterval(interval);
          setTimeout(() => setStep('review'), 1000);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [step, stages.length]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Create fake object URL for preview
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const startAIProcessing = () => {
    if (image) setStep('processing');
  };

  const handleSave = (status: 'published' | 'draft') => {
    const newProduct = {
      id: Math.random().toString(36).substring(2, 9),
      artisanId: 'a1',
      title: 'Handcrafted Terracotta Diya Set', // Should normally come from form state
      category: 'Pottery',
      priceMin: 250,
      priceMax: 350,
      descriptionEn: 'A set of 5 beautifully handcrafted terracotta diyas perfect for festivals and home decor.',
      descriptionHi: 'त्योहारों और घर की सजावट के लिए 5 खूबसूरती से हस्तनिर्मित टेराकोटा दीयों का एक सेट।',
      imageUrl: image || 'https://upload.wikimedia.org/wikipedia/commons/0/04/India_pottery.jpg',
      status: status,
      craftType: 'Terracotta',
      location: 'Udaipur, Rajasthan',
      createdAt: new Date().toISOString()
    };
    
    addProduct(newProduct);
    addToast(status === 'published' ? 'Product published successfully' : 'Product saved as draft', 'success');
    navigate('/artisan/products');
  };

  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        {step !== 'processing' && (
          <Button variant="ghost" size="icon" onClick={() => step === 'review' ? setStep('upload') : navigate('/artisan/dashboard')}>
            <ArrowLeft size={20} />
          </Button>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Add Your Product</h1>
          {step === 'upload' && <p className="text-muted-foreground">Upload a photo to get started.</p>}
          {step === 'processing' && <p className="text-accent font-medium flex items-center gap-2"><Sparkles size={16}/> AI is working its magic...</p>}
          {step === 'review' && <p className="text-muted-foreground">Review the AI-generated listing.</p>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded-3xl border-2 border-dashed border-secondary p-8 md:p-12 flex flex-col items-center justify-center text-center relative">
              <input 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                onChange={handleImageSelect}
              />
              
              {image ? (
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-sm">
                  <ImageWithFallback src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                    <Upload className="text-muted-foreground" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Upload a Product Photo</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-8">
                    Take a clear, well-lit photo of your craft. KalaSetu AI will automatically fill in the details.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 relative z-20 pointer-events-none">
                    <Button variant="outline" className="gap-2 pointer-events-auto">
                      <Camera size={18} /> Take a Photo
                    </Button>
                    <Button variant="outline" className="gap-2 pointer-events-auto">
                      <ImageIcon size={18} /> Choose from Gallery
                    </Button>
                  </div>
                </>
              )}
            </div>

            {image && (
              <div className="flex flex-col items-center">
                <p className="text-sm text-muted-foreground text-center mb-4 max-w-md">
                  Just upload a clear photo. KalaSetu will help create your product listing in seconds.
                </p>
                <Button size="lg" className="w-full max-w-md gap-2" onClick={startAIProcessing}>
                  <Sparkles size={20} /> Generate Listing with AI
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-secondary shadow-sm flex flex-col items-center"
          >
            <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
               <motion.div 
                 className="absolute inset-0 rounded-full border-4 border-accent border-t-transparent"
                 animate={{ rotate: 360 }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               ></motion.div>
               <div className="absolute inset-0 flex items-center justify-center text-accent">
                 <Sparkles size={32} />
               </div>
            </div>

            <div className="w-full max-w-md space-y-4">
              {stages.map((s, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index < processingStage ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="text-success shrink-0" size={24} />
                    </motion.div>
                  ) : index === processingStage ? (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }} 
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Circle className="text-accent shrink-0 fill-accent/20" size={24} />
                    </motion.div>
                  ) : (
                    <Circle className="text-muted shrink-0" size={24} />
                  )}
                  <span className={cn(
                    "text-sm font-medium transition-colors",
                    index < processingStage ? "text-foreground" : 
                    index === processingStage ? "text-foreground font-bold" : "text-muted-foreground"
                  )}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
            
            <p className="mt-8 text-sm font-medium text-muted-foreground animate-pulse">
              Please wait while we prepare your listing...
            </p>
          </motion.div>
        )}

        {step === 'review' && (
          <motion.div 
            key="review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-accent/10 border border-accent/20 text-accent-foreground p-4 rounded-xl flex items-start gap-3">
              <AlertCircle className="shrink-0 mt-0.5 text-accent" size={20} />
              <div>
                <p className="font-bold text-accent">AI Generated — Please Review</p>
                <p className="text-sm text-foreground/80 mt-1">Our AI has filled in the details based on your photo. You can edit any information before publishing.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Image Preview */}
              <div className="md:col-span-1">
                <div className="rounded-2xl overflow-hidden bg-muted border border-secondary shadow-sm sticky top-24">
                  <ImageWithFallback src={image || ''} alt="Product Preview" className="w-full h-auto aspect-square object-cover" />
                </div>
              </div>

              {/* Edit Form */}
              <div className="md:col-span-2 flex flex-col gap-5 bg-white p-6 rounded-3xl border border-secondary">
                <Input 
                  label="Product Title" 
                  defaultValue="Handcrafted Terracotta Diya Set" 
                />
                <Input 
                  label="Category" 
                  defaultValue="Pottery" 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    label="Minimum Price (₹)" 
                    type="number" 
                    defaultValue="250" 
                  />
                  <Input 
                    label="Maximum Price (₹)" 
                    type="number" 
                    defaultValue="350" 
                  />
                </div>

                <Textarea 
                  label="Description (English)" 
                  defaultValue="A set of 5 beautifully handcrafted terracotta diyas perfect for festivals and home decor. Made from natural clay and sustainable materials."
                  rows={4}
                />
                
                <Textarea 
                  label="विवरण (Hindi)" 
                  defaultValue="त्योहारों और घर की सजावट के लिए 5 खूबसूरती से हस्तनिर्मित टेराकोटा दीयों का एक सेट। प्राकृतिक मिट्टी और टिकाऊ सामग्री से बना है।"
                  rows={4}
                />

                <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-secondary">
                  <Button variant="outline" className="flex-1" onClick={() => setStep('upload')}>
                    Regenerate
                  </Button>
                  <Button variant="secondary" className="flex-1" onClick={() => handleSave('draft')}>
                    Save Draft
                  </Button>
                  <Button className="flex-[2]" onClick={() => handleSave('published')}>
                    Publish Product
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
