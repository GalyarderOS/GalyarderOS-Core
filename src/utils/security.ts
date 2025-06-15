
export const applySecurityHeaders = () => {
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://qwakkghefgahtycxzsfe.supabase.co wss://qwakkghefgahtycxzsfe.supabase.co https://accounts.google.com",
    "frame-src 'self' https://accounts.google.com",
  ].join('; ');

  // Apply meta tags for security
  const metaTags = [
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'robots', content: 'index, follow' },
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' },
    { 'http-equiv': 'X-XSS-Protection', content: '1; mode=block' },
    { 'http-equiv': 'Content-Security-Policy', content: csp },
  ];

  metaTags.forEach(tag => {
    const meta = document.createElement('meta');
    Object.entries(tag).forEach(([key, value]) => {
      meta.setAttribute(key, value);
    });
    document.head.appendChild(meta);
  });
};

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private timeWindow: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const validAttempts = attempts.filter(time => now - time < this.timeWindow);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }
  
  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const remainingTime = this.timeWindow - (Date.now() - oldestAttempt);
    return Math.max(0, remainingTime);
  }
}

// Session timeout utility
export class SessionManager {
  private timeoutId: NodeJS.Timeout | null = null;
  private lastActivity: number = Date.now();
  
  constructor(
    private timeoutMs: number = 30 * 60 * 1000, // 30 minutes
    private onTimeout: () => void = () => {}
  ) {
    this.setupActivityListeners();
    this.resetTimeout();
  }
  
  private setupActivityListeners() {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, this.resetTimeout.bind(this), true);
    });
  }
  
  private resetTimeout() {
    this.lastActivity = Date.now();
    
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    this.timeoutId = setTimeout(() => {
      this.onTimeout();
    }, this.timeoutMs);
  }
  
  destroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
