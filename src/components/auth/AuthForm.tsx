
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
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
    <Card className="border-2 border-border soft-shadow">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="flex items-center justify-center space-x-2 mb-4">
          {isLogin ? <Shield className="h-5 w-5 text-muted-foreground" /> : <Crown className="h-5 w-5 text-muted-foreground" />}
          <CardTitle className="text-2xl text-foreground font-playfair">
            {isLogin ? 'Sign In' : 'Create Account'}
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground font-playfair">
          {isLogin 
            ? 'Enter your credentials to continue' 
            : 'Join the exclusive community of achievers'
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <GoogleSignInButton onClick={handleGoogleSignIn} disabled={googleLoading} />

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground font-medium font-playfair">Or continue with email</span>
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

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground font-playfair">
            {isLogin ? "New to our exclusive platform?" : "Already part of the community?"}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 p-0 h-auto text-foreground hover:text-foreground/80 font-medium font-playfair"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </Button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
