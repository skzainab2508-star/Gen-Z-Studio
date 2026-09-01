import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Sparkles, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Gift, 
  Tag, 
  LogOut, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  MessageCircle,
  Award
} from 'lucide-react';
import { CustomerUser, AuthMode, MembershipTier } from '../types';
import { 
  getCurrentUser, 
  loginCustomer, 
  registerCustomer, 
  logoutCustomer, 
  updateUserProfile,
  INITIAL_DEMO_USERS 
} from '../utils/authStorage';
import { playLuxuryClick, playGoldClink, playSoftWoosh } from '../utils/audio';
import { STORE_INFO } from '../data/products';
import { formatPrice } from '../utils/currency';

interface CustomerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
  onOpenOrders?: () => void;
}

const INDIAN_CITIES_OPTIONS = [
  { city: 'Mumbai', state: 'Maharashtra' },
  { city: 'New Delhi', state: 'Delhi NCR' },
  { city: 'Bengaluru', state: 'Karnataka' },
  { city: 'Hyderabad', state: 'Telangana' },
  { city: 'Chennai', state: 'Tamil Nadu' },
  { city: 'Kolkata', state: 'West Bengal' },
  { city: 'Pune', state: 'Maharashtra' },
  { city: 'Ahmedabad', state: 'Gujarat' },
  { city: 'Jaipur', state: 'Rajasthan' },
  { city: 'Chandigarh', state: 'Punjab' }
];

const STYLE_OPTIONS = [
  'Limited Sneaker Drops',
  'Gold Embroidered Polos',
  'Signature Structured Caps',
  'Luxury Watches & Jewelry',
  'Streetwear & Hoodies'
];

export const CustomerAuthModal: React.FC<CustomerAuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
  onOpenOrders
}) => {
  const [currentUser, setCurrentUser] = useState<CustomerUser | null>(null);
  const [mode, setMode] = useState<AuthMode>(initialMode);
  
  // Login Form States
  const [loginEmailOrPhone, setLoginEmailOrPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form States
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regCity, setRegCity] = useState('Mumbai');
  const [regState, setRegState] = useState('Maharashtra');
  const [regStreet, setRegStreet] = useState('');
  const [regPincode, setRegPincode] = useState('');
  const [regInviteCode, setRegInviteCode] = useState('');
  const [regStyles, setRegStyles] = useState<string[]>(['Limited Sneaker Drops', 'Gold Embroidered Polos']);
  const [regWhatsappAlerts, setRegWhatsappAlerts] = useState(true);

  // Forgot Password / OTP Simulation States
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [newResetPassword, setNewResetPassword] = useState('');

  // Status & Feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFullName, setEditFullName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editStreet, setEditStreet] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editState, setEditState] = useState('');
  const [editPincode, setEditPincode] = useState('');

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (isOpen) {
      playSoftWoosh();
      setErrorMessage(null);
      setSuccessMessage(null);
      if (user && initialMode !== 'register') {
        setMode('profile');
        setEditFullName(user.fullName);
        setEditPhone(user.phone);
        setEditStreet(user.street || '');
        setEditCity(user.city || 'Mumbai');
        setEditState(user.state || 'Maharashtra');
        setEditPincode(user.pincode || '');
      } else {
        setMode(initialMode);
      }
    }
  }, [isOpen, initialMode]);

  // Listen to auth changes
  useEffect(() => {
    const handleAuthUpdated = (e: CustomEvent) => {
      const updatedUser = e.detail;
      setCurrentUser(updatedUser);
      if (updatedUser) {
        setEditFullName(updatedUser.fullName);
        setEditPhone(updatedUser.phone);
        setEditStreet(updatedUser.street || '');
        setEditCity(updatedUser.city || 'Mumbai');
        setEditState(updatedUser.state || 'Maharashtra');
        setEditPincode(updatedUser.pincode || '');
      }
    };
    window.addEventListener('genz-auth-updated' as any, handleAuthUpdated);
    return () => window.removeEventListener('genz-auth-updated' as any, handleAuthUpdated);
  }, []);

  if (!isOpen) return null;

  const handleClose = () => {
    playSoftWoosh();
    setErrorMessage(null);
    setSuccessMessage(null);
    onClose();
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmailOrPhone || !loginPassword) {
      setErrorMessage('Please enter both your registered email/phone and password.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const res = loginCustomer(loginEmailOrPhone, loginPassword);
      if (res.success && res.user) {
        playGoldClink();
        setCurrentUser(res.user);
        setSuccessMessage(res.message);
        setTimeout(() => {
          setMode('profile');
          setSuccessMessage(null);
        }, 1200);
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!regFullName.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (regPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please provide a valid 10-digit Indian phone number.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const formattedPhone = regPhone.startsWith('+91') 
        ? regPhone 
        : `+91 ${regPhone.trim().replace(/^0/, '')}`;

      const res = registerCustomer({
        fullName: regFullName,
        email: regEmail,
        phone: formattedPhone,
        password: regPassword,
        city: regCity,
        state: regState,
        street: regStreet,
        pincode: regPincode,
        stylePreferences: regStyles,
        inviteCode: regInviteCode,
        whatsappAlerts: regWhatsappAlerts
      });

      if (res.success && res.user) {
        playGoldClink();
        setCurrentUser(res.user);
        setSuccessMessage(res.message);
        setTimeout(() => {
          setMode('profile');
          setSuccessMessage(null);
        }, 1800);
      } else {
        setErrorMessage(res.message);
      }
    }, 750);
  };

  const handleQuickDemoLogin = (demoIndex: number) => {
    playLuxuryClick();
    const demo = INITIAL_DEMO_USERS[demoIndex];
    if (demo) {
      setLoginEmailOrPhone(demo.email);
      setLoginPassword(demo.password || 'password123');
      const res = loginCustomer(demo.email, demo.password || 'password123');
      if (res.success && res.user) {
        playGoldClink();
        setCurrentUser(res.user);
        setSuccessMessage(`Signed in as ${res.user.fullName} (${res.user.membershipTier})`);
        setTimeout(() => {
          setMode('profile');
          setSuccessMessage(null);
        }, 1000);
      }
    }
  };

  const handleLogout = () => {
    playLuxuryClick();
    logoutCustomer();
    setCurrentUser(null);
    setMode('login');
    setSuccessMessage('You have been successfully signed out of the Atelier.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    playGoldClink();
    const updated = updateUserProfile({
      fullName: editFullName,
      phone: editPhone,
      street: editStreet,
      city: editCity,
      state: editState,
      pincode: editPincode
    });
    if (updated) {
      setCurrentUser(updated);
      setIsEditingProfile(false);
      setSuccessMessage('Atelier customer profile updated successfully.');
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const toggleStylePreference = (style: string) => {
    playLuxuryClick();
    setRegStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const handleCitySelect = (selectedCity: string) => {
    setRegCity(selectedCity);
    const found = INDIAN_CITIES_OPTIONS.find(c => c.city === selectedCity);
    if (found) {
      setRegState(found.state);
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    playGoldClink();
    setOtpSent(true);
    setErrorMessage(null);
    setSuccessMessage('A 6-digit VIP recovery OTP has been sent to your email & registered WhatsApp.');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setErrorMessage('Please enter the 4 or 6 digit verification code.');
      return;
    }
    playGoldClink();
    setOtpVerified(true);
    setErrorMessage(null);
    setSuccessMessage('OTP code verified. Please set your new secure password.');
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newResetPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    playGoldClink();
    setSuccessMessage('Password reset successfully! You can now sign in with your new password.');
    setTimeout(() => {
      setMode('login');
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode('');
      setNewResetPassword('');
      setSuccessMessage(null);
    }, 1800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl border border-[#E5DEC9] shadow-[0_25px_70px_rgba(28,24,20,0.25)] overflow-hidden my-auto z-10 text-[#1C1814]"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 border border-[#E0D8C7] text-[#5C5248] hover:text-[#1C1814] hover:bg-white transition-all cursor-pointer shadow-sm"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* LEFT COLUMN: Editorial Atelier Guild Membership Perks (Desktop) */}
            <div className="lg:col-span-5 bg-[#1C1814] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
              
              {/* Gold Ambient Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B88E38]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#8A641A]/20 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                {/* Brand Monogram */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#997A15] via-[#D4AF37] to-[#F3E5AB] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                    <div className="w-full h-full rounded-[14px] bg-[#1C1814] flex items-center justify-center">
                      <span className="font-script text-xl text-[#F3E5AB]">G'Z</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                      Gen'Z Studio Atelier
                    </h3>
                    <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
                      Client Privilege Club
                    </p>
                  </div>
                </div>

                <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase tracking-wide leading-tight">
                  {mode === 'register' 
                    ? 'Enter The Inner Circle of Luxury' 
                    : mode === 'profile'
                    ? 'Your Atelier VIP Registry'
                    : 'Welcome To Your Customer Portal'}
                </h2>

                <p className="mt-3 text-xs text-[#C4BAA9] leading-relaxed">
                  Join our VIP customer circle for new drop updates, free express delivery across India, and special member rewards.
                </p>

                {/* VIP Membership Benefits List */}
                <div className="mt-6 space-y-3.5 pt-4 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#2D2620] border border-[#B88E38]/40 flex items-center justify-center text-[#F3E5AB] shrink-0 mt-0.5">
                      <Gift className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB]">₹2,000 VIP Welcome Credit</h4>
                      <p className="text-[11px] text-[#A89E8F]">Instant credit upon sign up to spend on your favorite looks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#2D2620] border border-[#B88E38]/40 flex items-center justify-center text-[#F3E5AB] shrink-0 mt-0.5">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB]">Blue Dart Express Delivery</h4>
                      <p className="text-[11px] text-[#A89E8F]">Fast and safe courier anywhere in India.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-[#2D2620] border border-[#B88E38]/40 flex items-center justify-center text-[#F3E5AB] shrink-0 mt-0.5">
                      <Award className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-[#F3E5AB]">100% Genuine Quality</h4>
                      <p className="text-[11px] text-[#A89E8F]">Every piece is inspected and verified before dispatch.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Demo Fill Buttons (For effortless test evaluation) */}
              <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
                <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#D4AF37] mb-2 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#FFE259]" /> Demo One-Click Sign In
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(0)}
                    className="p-2 rounded-xl bg-[#2A231C] border border-[#B88E38]/40 text-[11px] text-left hover:bg-[#382F26] hover:border-[#D4AF37] transition-all cursor-pointer text-white"
                  >
                    <p className="font-semibold text-white truncate">Aarav S.</p>
                    <p className="text-[9px] text-[#D4AF37]">VIP Member</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin(1)}
                    className="p-2 rounded-xl bg-[#2A231C] border border-[#B88E38]/40 text-[11px] text-left hover:bg-[#382F26] hover:border-[#D4AF37] transition-all cursor-pointer text-white"
                  >
                    <p className="font-semibold text-white truncate">Rohan V.</p>
                    <p className="text-[9px] text-[#F3E5AB]">Platinum VIP</p>
                  </button>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Forms (Login, Register, Forgot Password, Profile Dashboard) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[85vh] lg:max-h-none">
              
              <div>
                
                {/* Mode Tabs (Only visible when not in profile or forgot password) */}
                {mode !== 'profile' && mode !== 'forgot' && (
                  <div className="flex items-center p-1 rounded-2xl bg-[#EFE9DF] border border-[#E0D8C7] mb-6 max-w-sm">
                    <button
                      type="button"
                      onClick={() => {
                        playLuxuryClick();
                        setMode('login');
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className={`flex-1 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        mode === 'login'
                          ? 'bg-white text-[#1C1814] shadow-sm border border-[#E0D8C7]'
                          : 'text-[#6E6458] hover:text-[#1C1814]'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playLuxuryClick();
                        setMode('register');
                        setErrorMessage(null);
                        setSuccessMessage(null);
                      }}
                      className={`flex-1 py-2.5 rounded-xl font-cinzel text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        mode === 'register'
                          ? 'bg-white text-[#1C1814] shadow-sm border border-[#E0D8C7]'
                          : 'text-[#6E6458] hover:text-[#1C1814]'
                      }`}
                    >
                      Register
                    </button>
                  </div>
                )}

                {/* Banner Notifications */}
                {errorMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3.5 rounded-2xl bg-[#FFF1F0] border border-[#FFCCC7] text-xs text-[#CF1322] flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}

                {successMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3.5 rounded-2xl bg-[#F6FFED] border border-[#B7EB8F] text-xs text-[#389E0D] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </motion.div>
                )}

                {/* ================= MODE 1: CUSTOMER SIGN IN ================= */}
                {mode === 'login' && (
                  <div>
                    <div className="mb-6">
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1814] uppercase">
                        Customer Sign In
                      </h3>
                      <p className="text-xs text-[#6B6258] mt-1">
                        Enter your credentials to access your saved orders, wishlist, and store credits.
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1.5 font-bold">
                          Email Address or Phone Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. user@example.com or 9876543210"
                            value={loginEmailOrPhone}
                            onChange={(e) => setLoginEmailOrPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38] shadow-xs"
                          />
                          <Mail className="w-4 h-4 text-[#8A641A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-cinzel tracking-wider text-[#5C5248] uppercase font-bold">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              playLuxuryClick();
                              setMode('forgot');
                              setErrorMessage(null);
                              setSuccessMessage(null);
                            }}
                            className="text-[11px] text-[#8A641A] hover:underline font-medium cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type={showLoginPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38] shadow-xs"
                          />
                          <Lock className="w-4 h-4 text-[#8A641A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <button
                            type="button"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C8274] hover:text-[#1C1814] cursor-pointer"
                          >
                            {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-[#5C5248]">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="rounded border-[#E0D8C7] text-[#8A641A] focus:ring-[#8A641A]"
                          />
                          <span>Remember this device</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                      >
                        {isLoading ? (
                          <span>Verifying Atelier Credentials...</span>
                        ) : (
                          <>
                            <span>Sign In to Atelier</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-[#EAE3D3] text-center text-xs text-[#6B6258]">
                      <span>New to Gen'Z Studio? </span>
                      <button
                        type="button"
                        onClick={() => {
                          playLuxuryClick();
                          setMode('register');
                        }}
                        className="font-bold text-[#8A641A] hover:underline cursor-pointer font-cinzel ml-1"
                      >
                        Register Atelier Account
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= MODE 2: CUSTOMER REGISTRATION ================= */}
                {mode === 'register' && (
                  <div>
                    <div className="mb-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[10px] font-cinzel font-bold tracking-widest uppercase mb-2">
                        <Sparkles className="w-3 h-3 text-[#8A641A]" />
                        <span>Exclusive Atelier Membership</span>
                      </div>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1814] uppercase">
                        Create Customer Account
                      </h3>
                      <p className="text-xs text-[#6B6258] mt-0.5">
                        Register to claim your complimentary ₹2,000 VIP Store Credit.
                      </p>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                      
                      {/* Name & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="e.g. Rahul Sharma"
                              value={regFullName}
                              onChange={(e) => setRegFullName(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <User className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            Mobile Number (India) *
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              required
                              placeholder="+91 98765 43210"
                              value={regPhone}
                              onChange={(e) => setRegPhone(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <Phone className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="e.g. rahul@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                          />
                          <Mail className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* City & State Selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            City (India)
                          </label>
                          <select
                            value={regCity}
                            onChange={(e) => handleCitySelect(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] focus:outline-none focus:border-[#B88E38]"
                          >
                            {INDIAN_CITIES_OPTIONS.map(opt => (
                              <option key={opt.city} value={opt.city}>{opt.city} ({opt.state})</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            Delivery Pincode
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 400050"
                            value={regPincode}
                            onChange={(e) => setRegPincode(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                          />
                        </div>
                      </div>

                      {/* Passwords */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showRegPassword ? 'text' : 'password'}
                              required
                              placeholder="Min. 6 chars"
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <Lock className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                            <button
                              type="button"
                              onClick={() => setShowRegPassword(!showRegPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8274]"
                            >
                              {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold">
                            Confirm Password *
                          </label>
                          <div className="relative">
                            <input
                              type={showRegPassword ? 'text' : 'password'}
                              required
                              placeholder="Repeat password"
                              value={regConfirmPassword}
                              onChange={(e) => setRegConfirmPassword(e.target.value)}
                              className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <Lock className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* VIP Invitation / Promo Code */}
                      <div>
                        <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1 font-bold flex items-center justify-between">
                          <span>VIP Invitation Code (Optional)</span>
                          <span className="text-[#8A641A] font-sans font-semibold">Try: GENZGOLD</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Enter invite code e.g. GENZGOLD"
                            value={regInviteCode}
                            onChange={(e) => setRegInviteCode(e.target.value.toUpperCase())}
                            className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-[#E0D8C7] text-xs font-mono font-bold text-[#8A641A] uppercase placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                          />
                          <Tag className="w-3.5 h-3.5 text-[#8A641A] absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>

                      {/* Style Interests */}
                      <div>
                        <label className="block text-[10px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1.5 font-bold">
                          Fashion Category Preferences
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {STYLE_OPTIONS.map(style => {
                            const isSelected = regStyles.includes(style);
                            return (
                              <button
                                key={style}
                                type="button"
                                onClick={() => toggleStylePreference(style)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#FAF5EB] text-[#8A641A] border border-[#B88E38] font-bold shadow-xs'
                                    : 'bg-white text-[#6B6258] border border-[#E0D8C7] hover:border-[#B88E38]'
                                }`}
                              >
                                {isSelected ? '✓ ' : '+ '}{style}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* WhatsApp Drop Alerts Opt-in */}
                      <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#5C5248] pt-1">
                        <input
                          type="checkbox"
                          checked={regWhatsappAlerts}
                          onChange={(e) => setRegWhatsappAlerts(e.target.checked)}
                          className="rounded border-[#E0D8C7] text-[#25D366] focus:ring-[#25D366]"
                        />
                        <span className="flex items-center gap-1">
                          Receive VIP WhatsApp alerts for secret drops & tracking updates
                          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        </span>
                      </label>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        {isLoading ? (
                          <span>Registering in Atelier Registry...</span>
                        ) : (
                          <>
                            <span>Register & Claim ₹2,000 Credit</span>
                            <Sparkles className="w-4 h-4 text-white" />
                          </>
                        )}
                      </button>
                    </form>

                    <div className="mt-4 text-center text-xs text-[#6B6258]">
                      <span>Already registered? </span>
                      <button
                        type="button"
                        onClick={() => {
                          playLuxuryClick();
                          setMode('login');
                        }}
                        className="font-bold text-[#8A641A] hover:underline cursor-pointer font-cinzel ml-1"
                      >
                        Sign In Here
                      </button>
                    </div>
                  </div>
                )}

                {/* ================= MODE 3: FORGOT PASSWORD / RECOVERY ================= */}
                {mode === 'forgot' && (
                  <div>
                    <div className="mb-6">
                      <button
                        type="button"
                        onClick={() => {
                          playLuxuryClick();
                          setMode('login');
                          setOtpSent(false);
                          setOtpVerified(false);
                        }}
                        className="text-xs text-[#8A641A] hover:underline flex items-center gap-1 mb-2 font-medium cursor-pointer"
                      >
                        &larr; Back to Sign In
                      </button>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1814] uppercase">
                        Account Recovery & OTP
                      </h3>
                      <p className="text-xs text-[#6B6258] mt-1">
                        Securely recover your Gen'Z Studio Atelier customer profile via instant OTP verification.
                      </p>
                    </div>

                    {!otpSent ? (
                      <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1.5 font-bold">
                            Registered Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              required
                              placeholder="e.g. user@example.com"
                              value={forgotEmail}
                              onChange={(e) => setForgotEmail(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <Mail className="w-4 h-4 text-[#8A641A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Send 6-Digit VIP OTP</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    ) : !otpVerified ? (
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div className="p-3.5 rounded-2xl bg-[#FAF5EB] border border-[#E0D8C7] text-xs text-[#8A641A]">
                          An authentication OTP has been sent to <strong>{forgotEmail}</strong>. (For demonstration, any 4-6 digit code such as <strong>8822</strong> will verify).
                        </div>

                        <div>
                          <label className="block text-[11px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1.5 font-bold">
                            Enter OTP Code
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Enter 4 or 6 digit OTP"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-white border border-[#E0D8C7] text-center font-mono text-lg font-bold tracking-widest text-[#1C1814] focus:outline-none focus:border-[#B88E38]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Verify & Proceed</span>
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleResetPassword} className="space-y-4">
                        <div>
                          <label className="block text-[11px] font-cinzel tracking-wider text-[#5C5248] uppercase mb-1.5 font-bold">
                            Create New Secure Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              required
                              placeholder="Min. 6 characters"
                              value={newResetPassword}
                              onChange={(e) => setNewResetPassword(e.target.value)}
                              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                            />
                            <Lock className="w-4 h-4 text-[#8A641A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Update Password & Sign In</span>
                          <Check className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* ================= MODE 4: CUSTOMER ATELIER DASHBOARD / PROFILE ================= */}
                {mode === 'profile' && currentUser && (
                  <div>
                    {/* User Header Profile Card */}
                    <div className="p-5 rounded-3xl bg-white border border-[#E0D8C7] shadow-xs mb-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#997A15] via-[#D4AF37] to-[#F3E5AB] p-0.5 shadow-md shrink-0">
                            <div className="w-full h-full rounded-[14px] bg-[#1C1814] flex items-center justify-center text-white font-serif font-bold text-xl">
                              {currentUser.avatarLetter || currentUser.fullName.charAt(0)}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-cinzel text-lg font-bold text-[#1C1814]">
                                {currentUser.fullName}
                              </h3>
                              <span className="px-2.5 py-0.5 rounded-full bg-[#FAF5EB] border border-[#B88E38]/40 text-[#8A641A] text-[10px] font-cinzel font-bold tracking-wider uppercase">
                                {currentUser.membershipTier}
                              </span>
                            </div>
                            <p className="text-xs text-[#6B6258] mt-0.5">
                              {currentUser.email} &bull; {currentUser.phone}
                            </p>
                            <p className="text-[10px] text-[#8C8274] mt-0.5">
                              Client since {currentUser.joinedDate}
                            </p>
                          </div>
                        </div>

                        {/* Store Credit Balance Widget */}
                        <div className="px-4 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E0D8C7] text-right sm:text-right w-full sm:w-auto">
                          <p className="text-[10px] font-cinzel uppercase tracking-widest text-[#8A641A] font-bold">
                            Store Credit Balance
                          </p>
                          <p className="font-cinzel text-xl font-bold text-[#8A641A] mt-0.5">
                            {formatPrice(currentUser.credits)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dashboard Action Grid */}
                    {!isEditingProfile ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          
                          {/* Orders Shortcut */}
                          <button
                            type="button"
                            onClick={() => {
                              playSoftWoosh();
                              handleClose();
                              if (onOpenOrders) onOpenOrders();
                            }}
                            className="p-4 rounded-2xl bg-white border border-[#E0D8C7] hover:border-[#B88E38] hover:shadow-sm text-left transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Package className="w-5 h-5 text-[#8A641A]" />
                              <ArrowRight className="w-4 h-4 text-[#9E9588] group-hover:text-[#8A641A] group-hover:translate-x-1 transition-all" />
                            </div>
                            <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">
                              My Orders & Tracking
                            </h4>
                            <p className="text-[11px] text-[#6B6258] mt-0.5">
                              Track Blue Dart express shipments & review digital invoices.
                            </p>
                          </button>

                          {/* VIP WhatsApp Concierge */}
                          <a
                            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20Gen%27Z%20Studio%20VIP%20Desk,%20I%20am%20${encodeURIComponent(currentUser.fullName)}%20(${encodeURIComponent(currentUser.membershipTier)}).`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => playLuxuryClick()}
                            className="p-4 rounded-2xl bg-white border border-[#E0D8C7] hover:border-[#25D366] hover:shadow-sm text-left transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <MessageCircle className="w-5 h-5 text-[#25D366]" />
                              <ArrowRight className="w-4 h-4 text-[#9E9588] group-hover:text-[#25D366] group-hover:translate-x-1 transition-all" />
                            </div>
                            <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">
                              24/7 VIP Concierge Desk
                            </h4>
                            <p className="text-[11px] text-[#6B6258] mt-0.5">
                              Direct VIP customer support and sizing assistance on WhatsApp.
                            </p>
                          </a>
                        </div>

                        {/* Saved Default Shipping Address */}
                        <div className="p-4 rounded-2xl bg-white border border-[#E0D8C7] shadow-xs">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-cinzel text-xs font-bold text-[#1C1814] uppercase flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-[#8A641A]" />
                              <span>Registered Shipping Residence (India)</span>
                            </h4>
                            <button
                              type="button"
                              onClick={() => {
                                playLuxuryClick();
                                setIsEditingProfile(true);
                              }}
                              className="text-[11px] text-[#8A641A] font-bold hover:underline cursor-pointer"
                            >
                              Edit Details
                            </button>
                          </div>
                          <p className="text-xs text-[#5C5248] leading-relaxed">
                            {currentUser.street ? `${currentUser.street}, ` : ''}
                            {currentUser.city || 'Mumbai'}, {currentUser.state || 'Maharashtra'} {currentUser.pincode ? `- ${currentUser.pincode}` : ''}
                          </p>
                        </div>

                        {/* Account Switcher & Sign Out Bar */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#EAE3D3]">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                playLuxuryClick();
                                setIsEditingProfile(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs font-cinzel font-semibold text-[#5C5248] hover:text-[#1C1814] transition-colors cursor-pointer"
                            >
                              Edit Profile
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                playLuxuryClick();
                                setMode('login');
                              }}
                              className="px-4 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs font-cinzel font-semibold text-[#5C5248] hover:text-[#1C1814] transition-colors cursor-pointer"
                            >
                              Switch Account
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={handleLogout}
                            className="px-4 py-2 rounded-xl bg-[#FFF1F0] border border-[#FFCCC7] text-[#CF1322] hover:bg-[#FFE8E6] text-xs font-cinzel font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out of Atelier</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Edit Profile Form */
                      <form onSubmit={handleSaveProfile} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                              Full Name
                            </label>
                            <input
                              type="text"
                              required
                              value={editFullName}
                              onChange={(e) => setEditFullName(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              required
                              value={editPhone}
                              onChange={(e) => setEditPhone(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                            Street Address / Residence
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Penthouse 4B, Pali Hill Luxury Enclave"
                            value={editStreet}
                            onChange={(e) => setEditStreet(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={editCity}
                              onChange={(e) => setEditCity(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              value={editState}
                              onChange={(e) => setEditState(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-cinzel font-bold uppercase text-[#5C5248] mb-1">
                              Pincode
                            </label>
                            <input
                              type="text"
                              value={editPincode}
                              onChange={(e) => setEditPincode(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3">
                          <button
                            type="button"
                            onClick={() => setIsEditingProfile(false)}
                            className="px-4 py-2 rounded-xl bg-white border border-[#E0D8C7] text-xs text-[#6B6258]"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-gold-btn text-white text-xs font-cinzel font-bold uppercase shadow-sm"
                          >
                            Save Updates
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

              </div>

              {/* Bottom Security / Authenticity Assurance */}
              <div className="mt-6 pt-4 border-t border-[#EAE3D3] flex items-center justify-between text-[10px] text-[#8C8274]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1B6A3E]" />
                  <span>256-Bit Encrypted Atelier Security</span>
                </span>
                <span>Serving Exclusive Clientele Across India</span>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
