
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from '@/hooks/useAuthForm';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthForm } from '@/components/auth/AuthForm';
import { AuthFooter } from '@/components/auth/AuthFooter';

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
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
  } = useAuthForm();

  // Redirect if already authenticated
  if (user) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 font-playfair">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <AuthHeader isLogin={isLogin} />

          <AuthForm
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            fullName={fullName}
            setFullName={setFullName}
            loading={loading}
            googleLoading={googleLoading}
            handleGoogleSignIn={handleGoogleSignIn}
          />

          <AuthFooter />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
