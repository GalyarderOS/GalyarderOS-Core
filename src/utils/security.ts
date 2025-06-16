
// Security utilities for the application

// Rate limiter for preventing abuse
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number, windowMs: number) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  getRemainingTime(identifier: string): number {
    const userAttempts = this.attempts.get(identifier) || [];
    if (userAttempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...userAttempts);
    const timeRemaining = this.windowMs - (Date.now() - oldestAttempt);
    return Math.max(0, timeRemaining);
  }
}

// Session manager for automatic logout
export class SessionManager {
  private timeoutId: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();
  private timeout: number;
  private onTimeout: () => void;

  constructor(timeout: number, onTimeout: () => void) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;
    this.setupActivityListeners();
    this.resetTimer();
  }

  private setupActivityListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    const updateActivity = () => {
      this.lastActivity = Date.now();
      this.resetTimer();
    };

    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });
  }

  private resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      this.onTimeout();
    }, this.timeout);
  }

  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove basic HTML tags
    .slice(0, 1000); // Limit length
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Password strength validation
export const validatePasswordStrength = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// CSP and security headers
export const applySecurityHeaders = () => {
  // Add meta tags for security
  const addMetaTag = (name: string, content: string) => {
    const existing = document.querySelector(`meta[name="${name}"]`);
    if (!existing) {
      const meta = document.createElement('meta');
      meta.name = name;
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  // X-Content-Type-Options
  addMetaTag('X-Content-Type-Options', 'nosniff');
  
  // X-Frame-Options
  addMetaTag('X-Frame-Options', 'DENY');
  
  // Referrer Policy
  addMetaTag('referrer', 'strict-origin-when-cross-origin');
};

// File upload validation
export const validateFileUpload = (file: File, options: {
  maxSize?: number;
  allowedTypes?: string[];
  allowedExtensions?: string[];
}): { isValid: boolean; error?: string } => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  } = options;

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
    };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
    };
  }

  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!allowedExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: `File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`
    };
  }

  return { isValid: true };
};
