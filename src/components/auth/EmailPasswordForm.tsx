
import { useState } from 'react';
import { Button } from '@/components/global/ui/button';
import { Input } from '@/components/global/ui/input';
import { Label } from '@/components/global/ui/label';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

interface EmailPasswordFormProps {
  isLogin: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  loading: boolean;
}

export const EmailPasswordForm = ({
  isLogin,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  loading,
}: EmailPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-foreground font-playfair flex items-center gap-2">
            <User className="h-4 w-4" />
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your distinguished name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required={!isLogin}
            className="h-12 border-2 focus:border-muted-foreground transition-all duration-300 font-playfair"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground font-playfair flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 border-2 focus:border-muted-foreground transition-all duration-300 font-playfair"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-foreground font-playfair flex items-center gap-2">
          <Lock className="h-4 w-4" />
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 border-2 focus:border-muted-foreground pr-12 transition-all duration-300 font-playfair"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 bg-foreground hover:bg-foreground/90 text-background soft-shadow font-playfair transition-all duration-300"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background"></div>
            <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
          </div>
        ) : (
          isLogin ? 'Access Dashboard' : 'Join GalyarderOS'
        )}
      </Button>
    </form>
  );
};
