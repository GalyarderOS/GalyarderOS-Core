
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Crown, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already authenticated
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        if (!fullName.trim()) {
          toast({
            title: "Error",
            description: "Please enter your full name",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        result = await signUp(email, password, fullName);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else {
        if (!isLogin) {
          toast({
            title: "Success",
            description: "Account created successfully! Please check your email to verify your account.",
          });
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
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
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-6 text-muted-foreground hover:text-foreground old-money-button"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center soft-shadow">
                <img 
                  src="/lovable-uploads/e58a97fc-d08f-4514-be06-48ce8aaa4d1a.png" 
                  alt="GalyarderOS Logo" 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <span className="text-2xl font-bold old-money-heading" style={{ fontFamily: 'Playfair Display' }}>
                GalyarderOS
              </span>
            </div>
            
            <h1 className="text-3xl font-bold old-money-heading mb-2" style={{ fontFamily: 'Playfair Display' }}>
              {isLogin ? 'Welcome Back' : 'Join the Elite'}
            </h1>
            <p className="old-money-subheading">
              {isLogin 
                ? 'Access your personal operating system' 
                : 'Begin your journey to refined productivity'
              }
            </p>
          </div>

          {/* Auth Form */}
          <Card className="old-money-card border-2">
            <CardHeader className="space-y-1 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                {isLogin ? <Shield className="h-5 w-5 text-primary" /> : <Crown className="h-5 w-5 text-accent" />}
                <CardTitle className="text-2xl old-money-heading">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </CardTitle>
              </div>
              <CardDescription className="old-money-subheading">
                {isLogin 
                  ? 'Enter your credentials to continue' 
                  : 'Join the exclusive community of achievers'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-6 h-12 old-money-button border-2 hover:bg-muted/50"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-foreground"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium">Continue with Google</span>
                  </div>
                )}
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name</Label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Enter your distinguished name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin}
                      className="h-12 border-2 focus:border-accent transition-all duration-300"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-2 focus:border-accent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 border-2 focus:border-accent pr-12 transition-all duration-300"
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
                  className="w-full h-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-semibold soft-shadow-lg transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent-foreground"></div>
                      <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                    </div>
                  ) : (
                    isLogin ? 'Access Dashboard' : 'Join GalyarderOS'
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  {isLogin ? "New to our exclusive platform?" : "Already part of the community?"}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 p-0 h-auto text-accent hover:text-accent/80 font-medium"
                  >
                    {isLogin ? 'Create account' : 'Sign in'}
                  </Button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By continuing, you agree to our refined terms of service
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
