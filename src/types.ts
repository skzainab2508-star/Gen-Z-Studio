export type ProductCategory = 'all' | 'footwear' | 'apparel' | 'caps' | 'watches';

export interface Product {
  id: string;
  name: string;
  category: 'footwear' | 'apparel' | 'caps' | 'watches';
  price: number;
  originalPrice?: number;
  tag?: 'NEW DROP' | 'BESTSELLER' | 'LIMITED EDITION' | 'EXCLUSIVE';
  image: string;
  galleryImages: string[];
  description: string;
  details: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  iconName: 'sneaker' | 'polo' | 'cap' | 'watch';
  subtitle: string;
  image: string;
  itemCount: number;
  badge: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  season: string;
  tagline: string;
  image: string;
  itemsFeatured: string[];
}

export type OrderStatus = 'confirmed' | 'preparing' | 'dispatched' | 'out_for_delivery' | 'delivered';

export interface OrderItem {
  productId: string;
  name: string;
  category: string;
  price: number;
  image: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery: string;
  courier: string;
  trackingNumber: string;
  items: OrderItem[];
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export type MembershipTier = 'VIP Member' | 'Platinum Client' | 'Atelier Member';

export interface CustomerUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  membershipTier: MembershipTier;
  credits: number;
  joinedDate: string;
  stylePreferences: string[];
  avatarLetter: string;
  whatsappAlerts?: boolean;
}

export type AuthMode = 'login' | 'register' | 'forgot' | 'profile';

