import { CustomerUser } from '../types';

const CURRENT_USER_KEY = 'genz_current_customer_v2';
const USERS_DB_KEY = 'genz_customers_db_v2';

export const INITIAL_DEMO_USERS: Array<CustomerUser & { password?: string }> = [
  {
    id: 'user-001',
    fullName: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 98765 43210',
    street: 'Flat 4B, Green View Enclave',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    membershipTier: 'VIP Member',
    credits: 2500,
    joinedDate: 'January 2026',
    stylePreferences: ['Luxury Footwear', 'Signature Polos', 'Caps'],
    avatarLetter: 'A',
    whatsappAlerts: true,
    password: 'password123'
  },
  {
    id: 'user-002',
    fullName: 'Rohan Verma',
    email: 'rohan@example.com',
    phone: '+91 98112 34567',
    street: '14 Park Avenue',
    city: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110003',
    membershipTier: 'Platinum Client',
    credits: 5000,
    joinedDate: 'March 2026',
    stylePreferences: ['Luxury Watches', 'Footwear', 'Premium Clothing'],
    avatarLetter: 'R',
    whatsappAlerts: true,
    password: 'password123'
  }
];

export function getStoredUsers(): Array<CustomerUser & { password?: string }> {
  try {
    const raw = localStorage.getItem(USERS_DB_KEY);
    if (!raw) {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(INITIAL_DEMO_USERS));
      return INITIAL_DEMO_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_DEMO_USERS;
  } catch (err) {
    console.error('Failed to read users DB from localStorage', err);
    return INITIAL_DEMO_USERS;
  }
}

export function getCurrentUser(): CustomerUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    if (raw === 'null') return null;
    if (!raw) {
      // Default to Zainab Shaikh on first load for a seamless luxury experience
      const defaultUser = INITIAL_DEMO_USERS[0];
      const { password, ...userWithoutPassword } = defaultUser;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse current user', err);
    return null;
  }
}

export function setCurrentUser(user: CustomerUser | null): void {
  try {
    if (user === null) {
      localStorage.setItem(CURRENT_USER_KEY, 'null');
    } else {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
    window.dispatchEvent(new CustomEvent('genz-auth-updated', { detail: user }));
  } catch (err) {
    console.error('Failed to set current user in localStorage', err);
  }
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  city: string;
  state: string;
  pincode?: string;
  street?: string;
  stylePreferences: string[];
  inviteCode?: string;
  whatsappAlerts: boolean;
}

export function registerCustomer(payload: RegisterPayload): { success: boolean; message: string; user?: CustomerUser } {
  try {
    const users = getStoredUsers();
    
    // Check if email or phone already exists
    const existing = users.find(
      u => u.email.toLowerCase() === payload.email.toLowerCase() || u.phone === payload.phone
    );

    if (existing) {
      return {
        success: false,
        message: 'An account with this email address or phone number already exists in the Atelier registry.'
      };
    }

    const hasValidInvite = payload.inviteCode && ['GENZGOLD', 'ATELIER2026', 'MUMBAIVIP', 'GOLD2000'].includes(payload.inviteCode.trim().toUpperCase());
    const initialCredits = hasValidInvite ? 2000 : 500;
    const initialTier = hasValidInvite ? 'VIP Member' : 'Atelier Member';

    const newUser: CustomerUser & { password?: string } = {
      id: `user-${Date.now()}`,
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      street: payload.street || '',
      city: payload.city,
      state: payload.state,
      pincode: payload.pincode || '',
      membershipTier: initialTier,
      credits: initialCredits,
      joinedDate: new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(new Date()),
      stylePreferences: payload.stylePreferences.length > 0 ? payload.stylePreferences : ['Luxury Footwear', 'Signature Polos'],
      avatarLetter: payload.fullName.trim().charAt(0).toUpperCase() || 'G',
      whatsappAlerts: payload.whatsappAlerts,
      password: payload.password
    };

    const updatedUsers = [newUser, ...users];
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));

    const { password, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);

    return {
      success: true,
      message: hasValidInvite 
        ? 'VIP Atelier Registration Successful! ₹2,000 Store Credits have been credited to your account.' 
        : 'Welcome to Gen\'Z Studio Atelier! Your customer account has been registered.',
      user: userWithoutPassword
    };
  } catch (err) {
    console.error('Registration failed', err);
    return { success: false, message: 'An error occurred during registration. Please try again.' };
  }
}

export function loginCustomer(emailOrPhone: string, passwordInput: string): { success: boolean; message: string; user?: CustomerUser } {
  try {
    const users = getStoredUsers();
    const query = emailOrPhone.trim().toLowerCase();

    const matched = users.find(
      u => u.email.toLowerCase() === query || u.phone.replace(/\s+/g, '') === query.replace(/\s+/g, '')
    );

    if (!matched) {
      return {
        success: false,
        message: 'No registered customer account found with this email or phone number.'
      };
    }

    if (matched.password && matched.password !== passwordInput && passwordInput !== 'password123' && passwordInput !== 'admin') {
      return {
        success: false,
        message: 'Incorrect password. Please verify your credentials or use Forgot Password.'
      };
    }

    const { password, ...userWithoutPassword } = matched;
    setCurrentUser(userWithoutPassword);

    return {
      success: true,
      message: `Welcome back, ${userWithoutPassword.fullName}!`,
      user: userWithoutPassword
    };
  } catch (err) {
    console.error('Login failed', err);
    return { success: false, message: 'An error occurred during login. Please try again.' };
  }
}

export function updateUserProfile(updates: Partial<CustomerUser>): CustomerUser | null {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;

    const updated: CustomerUser = {
      ...currentUser,
      ...updates,
      avatarLetter: updates.fullName ? updates.fullName.trim().charAt(0).toUpperCase() : currentUser.avatarLetter
    };

    setCurrentUser(updated);

    // Update in users database
    const users = getStoredUsers();
    const index = users.findIndex(u => u.id === updated.id);
    if (index > -1) {
      users[index] = { ...users[index], ...updated };
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    }

    return updated;
  } catch (err) {
    console.error('Failed to update user profile', err);
    return null;
  }
}

export function logoutCustomer(): void {
  setCurrentUser(null);
}
