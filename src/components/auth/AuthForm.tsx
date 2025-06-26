
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/global/ui/card';
import { Separator } from '@/components/global/ui/separator';
import { Button } from '@/components/global/ui/button';
import { Crown, Shield } from 'lucide-react';
import { GoogleSignInButton } from './GoogleSignInButton';
import { EmailPasswordForm } from './EmailPasswordForm';

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  loading: boolean;
  googleLoading: boolean;
  handleGoogleSignIn: () => void;
}

export const AuthForm = ({
  isLogin,
  setIsLogin,
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  loading,
  googleLoading,
  handleGoogleSignIn,
}: AuthFormProps) => {
  return (
    <Card className="border-2 border-border soft-shadow w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center pb-4 px-4 sm:px-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {isLogin ? <Shield className="h-5 w-5 text-muted-foreground" /> : <Crown className="h-5 w-5 text-muted-foreground" />}
          <CardTitle className="text-xl sm:text-2xl text-foreground font-playfair">
            {isLogin ? 'Masuk' : 'Buat Akun'}
          </CardTitle>
        </div>
        <CardDescription className="text-sm sm:text-base text-muted-foreground font-playfair">
          {isLogin 
            ? 'Masukkan kredensial Anda untuk melanjutkan' 
            : 'Bergabunglah dengan komunitas eksklusif pencapai tujuan'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 space-y-4">
        <GoogleSignInButton onClick={handleGoogleSignIn} disabled={googleLoading} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground font-medium font-playfair">Atau lanjut dengan email</span>
          </div>
        </div>

        <EmailPasswordForm
          isLogin={isLogin}
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          fullName={fullName}
          setFullName={setFullName}
          loading={loading}
        />

        <div className="text-center pt-2">
          <p className="text-sm text-muted-foreground font-playfair">
            {isLogin ? "Baru di platform eksklusif kami?" : "Sudah menjadi bagian komunitas?"}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 p-0 h-auto text-foreground hover:text-foreground/80 font-medium font-playfair text-sm"
            >
              {isLogin ? 'Buat akun' : 'Masuk'}
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
