import { Product, CategoryInfo, LookbookItem } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'footwear',
    name: 'Footwear & Sneakers',
    iconName: 'sneaker',
    subtitle: 'Sculpted silhouettes, Italian leather, handcrafted luxury soles',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
    badge: 'NEW DROP'
  },
  {
    id: 'apparel',
    name: 'Polos & Apparel',
    iconName: 'polo',
    subtitle: 'Heavyweight pima cotton, 3D metallic embroidery, premium tailoring',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    badge: 'SIGNATURE'
  },
  {
    id: 'caps',
    name: 'Caps & Headwear',
    iconName: 'cap',
    subtitle: 'Solid brass hardware, premium suede & structured crowns',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    itemCount: 9,
    badge: 'ESSENTIAL'
  },
  {
    id: 'watches',
    name: 'Watches & Jewelry',
    iconName: 'watch',
    subtitle: 'Automatic skeleton movements, gold bezels & Cuban link chains',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
    badge: 'LIMITED'
  }
];

export const PRODUCTS: Product[] = [
  // FOOTWEAR
  {
    id: 'fw-01',
    name: 'Gen\'Z Apex Gold Velvet Runner',
    category: 'footwear',
    price: 24999,
    originalPrice: 29999,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Top-tier luxury streetwear sneakers. Handcrafted with premium black calf leather, polished gold heel accents, and ultra-soft cushioning for all-day comfort and standout style.',
    details: [
      'Genuine Italian leather & soft suede overlays',
      'Polished gold heel stabilizer clip',
      'Memory foam footbed with custom arch support',
      'Signature Gen\'Z embossed tongue emblem',
      'Custom luxury magnetic presentation box included'
    ],
    sizes: ['UK/IND 6', 'UK/IND 7', 'UK/IND 8', 'UK/IND 9', 'UK/IND 10', 'UK/IND 11', 'UK/IND 12'],
    colors: [
      { name: 'Black & Gold', hex: '#0A0A0A' },
      { name: 'Pure White & Gold', hex: '#EAEAEA' },
      { name: 'Midnight Charcoal', hex: '#222222' }
    ],
    rating: 4.9,
    reviewsCount: 148,
    inStock: true,
    featured: true
  },
  {
    id: 'fw-02',
    name: 'Nocturne Matte High-Top Sneaker',
    category: 'footwear',
    price: 28999,
    tag: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'High-top profile engineered with structured matte leather, brass lace locks, and a comfortable sole designed for everyday wear.',
    details: [
      'Matte black leather upper',
      'Custom engraved gold aglets and eyelets',
      'Padded ankle collar for maximum structural comfort',
      'Hand-stitched perimeter sole'
    ],
    sizes: ['UK/IND 7', 'UK/IND 8', 'UK/IND 9', 'UK/IND 10', 'UK/IND 11'],
    colors: [
      { name: 'Triple Black Gold', hex: '#111111' },
      { name: 'Shadow Gray', hex: '#333333' }
    ],
    rating: 4.8,
    reviewsCount: 89,
    inStock: true,
    featured: true
  },
  {
    id: 'fw-03',
    name: 'Royal Gold Suede Loafers',
    category: 'footwear',
    price: 22999,
    originalPrice: 26999,
    tag: 'LIMITED EDITION',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Classic luxury with modern attitude. Features velvet suede, clean hand-sewn stitching, and the iconic Gen\'Z Studio gold horsebit buckle.',
    details: [
      'Velveteen Spanish calf suede',
      'Custom gold cast horsebit hardware',
      'Leather sole with anti-slip rubber traction insert',
      'Silk interior lining'
    ],
    sizes: ['UK/IND 6', 'UK/IND 7', 'UK/IND 8', 'UK/IND 9', 'UK/IND 10', 'UK/IND 11'],
    colors: [
      { name: 'Midnight Black', hex: '#0D0D0D' },
      { name: 'Imperial Navy', hex: '#0B132B' }
    ],
    rating: 5.0,
    reviewsCount: 42,
    inStock: true
  },

  // APPAREL
  {
    id: 'ap-01',
    name: 'Signature 3D Gold Embroidered Polo',
    category: 'apparel',
    price: 13999,
    originalPrice: 16499,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The definitive Gen\'Z Studio polo. Tailored from 280GSM double-mercerized Peruvian Pima cotton, finished with a 3D metallic gold chest crest and custom mother-of-pearl buttons.',
    details: [
      '100% Ultra-Soft Mercerized Pima Cotton (280 GSM)',
      'High-density 3D gold bullion embroidery on chest',
      'Anti-curl structured ribbed collar and cuffs',
      'Side vent slits with gold reinforced bar-tacks'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#0A0A0A' },
      { name: 'Pure Chalk', hex: '#F5F5F5' },
      { name: 'Rich Olive', hex: '#283618' }
    ],
    rating: 4.95,
    reviewsCount: 215,
    inStock: true,
    featured: true
  },
  {
    id: 'ap-02',
    name: 'Royal Velvet Streetwear Bomber Jacket',
    category: 'apparel',
    price: 34999,
    originalPrice: 39999,
    tag: 'EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'A heavyweight luxury outerwear statement piece. Premium matte satin velvet, heavy gold double YKK zippers, and oversized editorial cut with silk jacquard Gen\'Z monogram lining.',
    details: [
      'Heavyweight Japanese black velvet exterior',
      'Full gold-tone heavy dual hardware',
      'Custom gold jacquard interior lining',
      'Concealed interior passport pocket',
      'Dropped shoulder contemporary luxury fit'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx Gold', hex: '#0B0B0B' },
      { name: 'Deep Burgundy Gold', hex: '#4A0E17' }
    ],
    rating: 4.9,
    reviewsCount: 67,
    inStock: true,
    featured: true
  },
  {
    id: 'ap-03',
    name: 'Haute Heavyweight Oversized Tee - Gilded Edition',
    category: 'apparel',
    price: 8999,
    tag: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Crafted with a dense 320GSM cotton jersey that drapes with architectural perfection. Features the iconic cursive Gen\'Z Studio metallic puff print across back.',
    details: [
      '320 GSM organic combed cotton',
      'Thick 1.25" rib knit collar that maintains shape',
      'High-gloss gold foil screenprint with raised texture',
      'Pre-shrunk vintage wash'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Obsidian Black', hex: '#0A0A0A' },
      { name: 'Vintage Off-White', hex: '#ECE8DD' },
      { name: 'Raw Sand', hex: '#C2B280' }
    ],
    rating: 4.85,
    reviewsCount: 178,
    inStock: true
  },
  {
    id: 'ap-04',
    name: 'Gilded Heritage French Terry Hoodie',
    category: 'apparel',
    price: 19999,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80'
    ],
    description: '500GSM looped French terry offering substantial heft and drape. Fitted with gold metal aglets and subtle tonal chest branding.',
    details: [
      '500 GSM heavy combed French terry',
      'Solid brass engraved drawcord tips',
      'Double-layered hood with seamless construction',
      'Kangaroo pocket with reinforced side seams'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Jet Black', hex: '#000000' },
      { name: 'Smoked Charcoal', hex: '#1C1C1C' }
    ],
    rating: 4.9,
    reviewsCount: 94,
    inStock: true
  },

  // CAPS & HEADWEAR
  {
    id: 'cap-01',
    name: 'Crown 3D Metal Ingot Snapback',
    category: 'caps',
    price: 7999,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Structured 6-panel silhouette featuring a solid polished zinc-alloy 3D Gen\'Z Studio gold plate, premium wool blend, and leather under-brim with gold foil stamping.',
    details: [
      'Heavyweight 80% wool / 20% acrylic twill structure',
      'Custom electroplated mirror gold front plaque',
      'Supple lambskin leather under-visor',
      'Adjustable gold snap closure with stamped eyelet'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Deep Black', hex: '#0A0A0A' },
      { name: 'Midnight Gold', hex: '#1E1E1E' }
    ],
    rating: 4.9,
    reviewsCount: 132,
    inStock: true,
    featured: true
  },
  {
    id: 'cap-02',
    name: 'Obsidian Suede Luxury Trucker',
    category: 'caps',
    price: 6999,
    originalPrice: 8999,
    tag: 'NEW DROP',
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Elevated streetwear staple. Soft faux suede crown paired with breathable matte mesh and a high-relief metallic gold scripted logo.',
    details: [
      'Velvet touch front suede panel',
      'High-grade aerodynamic rear mesh',
      '3D embroidered Gen\'Z Studio script',
      'Moisture-wicking interior sweatband'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Black on Black', hex: '#000000' },
      { name: 'Mocha Gold', hex: '#3E2723' }
    ],
    rating: 4.75,
    reviewsCount: 58,
    inStock: true
  },
  {
    id: 'cap-03',
    name: 'Minimalist Gold Monogram Dad Hat',
    category: 'caps',
    price: 5999,
    tag: 'EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Unstructured relaxed fit in heavy washed chino cotton. Subtle gold thread micro-monogram on front with antique brass buckle strapback.',
    details: [
      '100% Washed vintage cotton twill',
      'Subtle metallic bullion thread embroidery',
      'Custom brass slider buckle',
      'Clean low-profile crown'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Washed Stone', hex: '#8C857B' }
    ],
    rating: 4.8,
    reviewsCount: 71,
    inStock: true
  },

  // WATCHES & LUXURY ACCESSORIES
  {
    id: 'wt-01',
    name: 'Aethelgard Chronograph Gold Edition',
    category: 'watches',
    price: 56999,
    originalPrice: 65999,
    tag: 'LIMITED EDITION',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'The centerpiece timepiece of Gen\'Z Studio. Multi-layered sunburst black dial, gold PVD stainless steel casing, precision Japanese automatic chronograph, and scratch-resistant sapphire crystal.',
    details: [
      '42mm 316L Surgical grade stainless steel casing with gold PVD finish',
      'Scratch-proof double-domed sapphire crystal with anti-reflective coating',
      'Exhibition caseback showing mechanical movement',
      '5 ATM (50m) Water resistance',
      'Solid link jubilee bracelet with butterfly deployment clasp',
      'Individually numbered (Limited to 500 pieces worldwide)'
    ],
    sizes: ['42mm Case (Standard)'],
    colors: [
      { name: 'Pure Gold & Black Dial', hex: '#D4AF37' },
      { name: 'Two-Tone Silver/Gold', hex: '#C0C0C0' }
    ],
    rating: 5.0,
    reviewsCount: 112,
    inStock: true,
    featured: true
  },
  {
    id: 'wt-02',
    name: 'Chronos Skeleton Automatic Timepiece',
    category: 'watches',
    price: 69999,
    tag: 'EXCLUSIVE',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'An architectural mechanical masterpiece. Open-heart skeleton dial revealing intricate gold gears, luminous sword hands, and genuine Italian alligator-embossed leather strap.',
    details: [
      'Self-winding automatic movement with 48-hour power reserve',
      'Intricate skeletonized gold-plated gear train',
      'Sapphire crystal glass front and back',
      'Italian hand-stitched leather strap with quick-release spring bars'
    ],
    sizes: ['44mm Case'],
    colors: [
      { name: 'Gold / Black Leather', hex: '#D4AF37' },
      { name: 'Rose Gold / Espresso', hex: '#B76E79' }
    ],
    rating: 4.95,
    reviewsCount: 64,
    inStock: true,
    featured: true
  },
  {
    id: 'wt-03',
    name: 'Gilded Cuban Link Chain & Bracelet Set (18K Plated)',
    category: 'watches',
    price: 18499,
    originalPrice: 21999,
    tag: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80'
    ],
    description: 'Solid 12mm flat-cut Cuban link chain and matching wrist piece. Triple-dipped in 18K yellow gold with custom iced Gen\'Z safety box lock.',
    details: [
      '12mm Diamond-cut Cuban links',
      'Heavy 18K gold bonded over 316L solid steel base (no tarnishing)',
      'Dual-trigger safety clasp with micro-pavé CZ accents',
      'Chain length: 20" or 22" | Bracelet length: 8"'
    ],
    sizes: ['20" Chain + 8" Bracelet', '22" Chain + 8.5" Bracelet'],
    colors: [
      { name: 'Yellow Gold (18K Plated)', hex: '#E5C158' },
      { name: 'White Gold / Rhodium', hex: '#E0E0E0' }
    ],
    rating: 4.9,
    reviewsCount: 189,
    inStock: true
  }
];

export const LOOKBOOK: LookbookItem[] = [
  {
    id: 'lb-01',
    title: 'The Midnight Sovereign',
    season: 'Autumn / Winter Drop 01',
    tagline: 'High-density velvet textures grounded by sharp gold accents.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    itemsFeatured: ['Royal Velvet Streetwear Bomber', 'Apex Gold Velvet Runner', 'Crown 3D Snapback']
  },
  {
    id: 'lb-02',
    title: 'Monochrome Majesty',
    season: 'Editorial Edition',
    tagline: 'Hyper-tailored silhouettes built for the new era of young luxury.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    itemsFeatured: ['Signature 3D Gold Embroidered Polo', 'Aethelgard Chronograph', 'Sovereign Loafers']
  },
  {
    id: 'lb-03',
    title: 'Gilded Street Ethos',
    season: 'Capsule Collection',
    tagline: 'Heavyweight drapery and bespoke metalwork redefining Gen Z couture.',
    image: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1200&q=80',
    itemsFeatured: ['Haute Heavyweight Tee', 'Cuban Link Set', 'Nocturne High-Tops']
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 'ig-1',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    caption: 'Gold in every stitch. The Apex Runner just landed. @genzstudio2026 #GenZStudio #LuxuryStreetwear',
    likes: '2,400',
    comments: 184,
    tag: 'FOOTWEAR'
  },
  {
    id: 'ig-2',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
    caption: 'Signature 3D Gold Polo. Heavyweight pima cotton perfection. Link in bio to order via WhatsApp. #GenZStudio',
    likes: '3,100',
    comments: 240,
    tag: 'APPAREL'
  },
  {
    id: 'ig-3',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
    caption: 'Limited to 500 numbered pieces worldwide. Aethelgard Gold Edition. #Timepiece #GoldStandard',
    likes: '4,800',
    comments: 392,
    tag: 'WATCHES'
  },
  {
    id: 'ig-4',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
    caption: 'Crown 3D Metal Plate Snapback. Elevate every look effortlessly. #GenZHeadwear',
    likes: '1,900',
    comments: 98,
    tag: 'CAPS'
  },
  {
    id: 'ig-5',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80',
    caption: 'Velvet Bomber season is here. Dark luxury aesthetic crafted for the bold. #GenZStudioLookbook',
    likes: '5,200',
    comments: 415,
    tag: 'EDITORIAL'
  },
  {
    id: 'ig-6',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    caption: '18K Cuban Link drip. Solid steel base, mirror gold plating. #LuxuryAccessories',
    likes: '2,800',
    comments: 173,
    tag: 'JEWELRY'
  }
];

export const BRAND_STORY = {
  headline: 'WHERE HAUTE COUTURE MEETS INDIAN STREET CULTURE',
  subhead: 'Born in Mumbai for a new generation of Indian tastemakers who wear their ambition in pure gold.',
  paragraphs: [
    'Gen\'Z Studio was created with a clear belief: Indian luxury streetwear should be bold, unapologetic, and crafted with world-class quality. From our atelier in Mumbai, we create standout menswear, high-top sneakers, structured caps, and automatic timepieces that command every room you walk into.',
    'Every single drop is created with obsession — electroplated gold emblems, 380 GSM heavyweight organic cotton, and hand-stitched detailing. We make strictly limited quantities so your look stays unique and exclusive.',
    'Own the room. Welcome to Gen\'Z Studio.'
  ],
  stats: [
    { value: '100%', label: 'Heavyweight Fabrics & Gold Accents' },
    { value: '28,000+', label: 'Indian Pincodes Served' },
    { value: '45,000+', label: 'VIP Clients Across India' },
    { value: '24/7', label: 'WhatsApp Concierge Desk' }
  ]
};

export const STORE_INFO = {
  address: 'Gen\'Z Studio Flagship Atelier, 484 Linking Road, Bandra West, Mumbai, Maharashtra - 400050',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400050',
  hours: 'Monday – Sunday: 11:00 AM – 9:30 PM (Private Suite by Appointment)',
  phone: '+91 98201 43690',
  whatsappNumber: '919820143690',
  whatsappDisplay: '+91 98201 43690',
  instagramHandle: '@genzstudio2026',
  instagramUrl: 'https://instagram.com/genzstudio2026',
  email: 'concierge@genzstudio.in'
};
