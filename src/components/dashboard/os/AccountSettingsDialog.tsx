
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera } from 'lucide-react';
import { toast } from 'sonner';

const profileSchema = z.object({
  full_name: z.string().min(1, "Name is required."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const AccountSettingsDialog: React.FC<{ onOpenChange: (open: boolean) => void }> = ({ onOpenChange }) => {
  const { user, profile, reloadProfile } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>();

  useEffect(() => {
    if (profile) {
      reset({ full_name: profile.full_name || '' });
    }
  }, [profile, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast.error("File is too large. Maximum size is 2MB.");
        return;
      }
      setAvatarFile(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    let avatarUrlToUpdate: string | undefined = undefined;

    try {
      if (avatarFile) {
        setIsUploading(true);
        const fileExt = avatarFile.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;

        // Hapus avatar lama jika ada
        if (profile?.avatar_url) {
            const oldAvatarPath = profile.avatar_url.split('/').pop();
            if(oldAvatarPath) {
                await supabase.storage.from('avatars').remove([`${user.id}/${oldAvatarPath}`]);
            }
        }

        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, avatarFile);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
        avatarUrlToUpdate = publicUrl;
        setIsUploading(false);
      }

      const updates: { full_name: string; avatar_url?: string; updated_at: string } = {
        full_name: data.full_name,
        updated_at: new Date().toISOString(),
      };

      if (avatarUrlToUpdate) {
        updates.avatar_url = avatarUrlToUpdate;
      }
      
      const { error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user.id);
      
      if (updateError) throw updateError;

      toast.success('Profile updated successfully!');
      await reloadProfile();
      setAvatarFile(null);
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to update profile.');
      setIsUploading(false);
    }
  };

  const avatarPreview = avatarFile 
    ? URL.createObjectURL(avatarFile) 
    : (profile?.avatar_url || user?.user_metadata?.avatar_url);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col items-center space-y-4 pt-4">
          <div className="relative">
            <Avatar className="w-24 h-24 text-lg">
              <AvatarImage src={avatarPreview} alt="User Avatar" />
              <AvatarFallback>
                <User className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
              <input id="avatar-upload" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleAvatarChange} disabled={isUploading} />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="full_name" className="text-sm font-medium">Full Name</label>
          <Input id="full_name" {...register('full_name')} className="mt-1"/>
          {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name.message}</p>}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting || isUploading ? 'Saving...' : 'Save changes'}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
