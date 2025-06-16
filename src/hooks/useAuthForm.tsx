
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { RateLimiter } from '@/utils/security';

const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin && !loginRateLimiter.isAllowed(email)) {
      const remainingTime = Math.ceil(loginRateLimiter.getRemainingTime(email) / 1000 / 60);
      toast({
        title: "Terlalu banyak percobaan login",
        description: `Harap tunggu sekitar ${remainingTime} menit sebelum mencoba lagi.`,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Harap masukkan nama lengkap Anda",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        let errorMessage = result.error.message;
        
        // Translate common error messages to Indonesian
        if (errorMessage.includes('Invalid login credentials')) {
          errorMessage = 'Email atau password salah';
        } else if (errorMessage.includes('User already registered')) {
          errorMessage = 'Email sudah terdaftar';
        } else if (errorMessage.includes('Password should be at least 6 characters')) {
          errorMessage = 'Password harus minimal 6 karakter';
        } else if (errorMessage.includes('Unable to validate email address')) {
          errorMessage = 'Format email tidak valid';
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        if (!isLogin) {
          toast({
            title: "Berhasil!",
            description: "Akun berhasil dibuat! Silakan cek email Anda untuk verifikasi akun.",
          });
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        let errorMessage = result.error.message;
        
        // Translate Google auth errors
        if (errorMessage.includes('popup_closed_by_user')) {
          errorMessage = 'Login Google dibatalkan';
        } else if (errorMessage.includes('access_denied')) {
          errorMessage = 'Akses ditolak oleh Google';
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal masuk dengan Google. Silakan coba lagi.",
        variant: "destructive"
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    loading,
    googleLoading,
    handleSubmit,
    handleGoogleSignIn,
  };
};
