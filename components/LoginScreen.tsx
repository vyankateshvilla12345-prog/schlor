
import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, Phone, KeyRound, ArrowRight, Loader2, UserPlus, LogIn, RefreshCcw, ShieldCheck } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (isAdmin: boolean) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER' | 'OTP'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_EMAIL = "vyankateshvilla12345@gmail.com";
  const ADMIN_PASS = "12345";

  const handleAuthAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated Delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Admin Check
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        onLoginSuccess(true);
        return;
      }

      if (authMode === 'REGISTER') {
        alert("Registration successful! You can now log in.");
        setAuthMode('LOGIN');
      } else if (authMode === 'OTP' && !otpSent) {
        if (!phone) {
           alert("Please enter a phone number");
           return;
        }
        setOtpSent(true);
        alert(`OTP sent to ${phone}: 123456 (Simulated)`);
      } else if (authMode === 'OTP' && otpSent) {
        if (otp === '123456') {
          onLoginSuccess(false);
        } else {
          alert("Invalid OTP");
        }
      } else {
        // Standard User Login
        onLoginSuccess(false);
      }
    }, 1200);
  };

  const toggleMode = () => {
    setOtpSent(false);
    if (authMode === 'OTP') setAuthMode('LOGIN');
    else setAuthMode('OTP');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-scholar-50 to-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-scholar-200 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[100px] opacity-30"></div>
      </div>

      <div className={`w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-10 animate-fade-in border border-gray-100 transition-all ${email === ADMIN_EMAIL ? 'ring-4 ring-red-500/20' : 'shadow-scholar-200/50'}`}>
        <div className="text-center mb-6">
          <div className={`inline-flex p-3 rounded-2xl shadow-lg mb-4 transition-colors ${email === ADMIN_EMAIL ? 'bg-red-600 shadow-red-300' : 'bg-scholar-600 shadow-scholar-300'}`}>
            {email === ADMIN_EMAIL ? <ShieldCheck className="w-10 h-10 text-white" /> : <GraduationCap className="w-10 h-10 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-scholar-900 mb-1">Scholar Hub</h1>
          <p className="text-scholar-600 font-medium text-xs tracking-widest uppercase">Academy</p>
        </div>

        <div className="mb-6 text-center">
            <h2 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-scholar-600 to-purple-800 tracking-wider uppercase">
                BY CHETAN KASAR
            </h2>
        </div>

        <form onSubmit={handleAuthAction} className="space-y-4">
          {authMode !== 'OTP' ? (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Email Address</label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-scholar-500`} size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-scholar-500 focus:ring-4 focus:ring-scholar-100 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                    placeholder="student@scholarhub.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-scholar-500" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-scholar-500 focus:ring-4 focus:ring-scholar-100 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-scholar-500" size={18} />
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-scholar-500 focus:ring-4 focus:ring-scholar-100 outline-none transition-all bg-gray-50 focus:bg-white text-sm"
                    placeholder="+91XXXXXXXXXX"
                  />
                </div>
              </div>
              {otpSent && (
                <div className="space-y-2 animate-fade-in">
                  <label className="text-xs font-bold text-gray-500 ml-1 uppercase">Enter OTP</label>
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-scholar-500" size={18} />
                    <input 
                      type="text" 
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-scholar-500 focus:ring-4 focus:ring-scholar-100 outline-none transition-all bg-gray-50 focus:bg-white text-sm text-center font-bold tracking-[0.5em]"
                      placeholder="000000"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <div className="pt-2 space-y-3">
            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${email === ADMIN_EMAIL ? 'bg-red-600 shadow-red-200 hover:bg-red-700' : 'bg-scholar-600 shadow-scholar-200 hover:bg-scholar-700'}`}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (
                <>
                  {email === ADMIN_EMAIL ? 'Access Secure Panel' : (
                    <>
                      {authMode === 'LOGIN' && <><LogIn size={18} /> Login</>}
                      {authMode === 'REGISTER' && <><UserPlus size={18} /> Register</>}
                      {authMode === 'OTP' && (otpSent ? 'Verify OTP' : 'Send OTP')}
                    </>
                  )}
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button 
                type="button"
                onClick={toggleMode}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                <RefreshCcw size={14} /> {authMode === 'OTP' ? 'Email Mode' : 'OTP Mode'}
              </button>
              <button 
                type="button"
                onClick={() => setAuthMode(authMode === 'REGISTER' ? 'LOGIN' : 'REGISTER')}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-50 transition-colors"
              >
                {authMode === 'REGISTER' ? 'Back to Login' : 'Create Account'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <p className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-tighter">© 2025 Scholar Hub • Enterprise Grade Security</p>
    </div>
  );
};

export default LoginScreen;
