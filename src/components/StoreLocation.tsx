import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Mail, 
  Sparkles, 
  Calendar, 
  Send, 
  Check, 
  Navigation 
} from 'lucide-react';
import { STORE_INFO } from '../data/products';
import { playLuxuryClick, playGoldClink } from '../utils/audio';

export const StoreLocation: React.FC = () => {
  const [bookingName, setBookingName] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleBookVIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingDate) return;

    playGoldClink();

    // Trigger WhatsApp formatted appointment booking
    const text = encodeURIComponent(
      `Hello Gen'Z Studio Atelier Concierge!\n\nI would like to reserve a VIP Private Fitting Appointment:\n• Name: ${bookingName}\n• Desired Date/Time: ${bookingDate}\n• Notes/Preferences: ${bookingNotes || 'Full Studio Collection Overview'}\n\nPlease confirm availability at the Bandra West Atelier.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`, '_blank');
    
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingName('');
      setBookingDate('');
      setBookingNotes('');
    }, 4000);
  };

  return (
    <section id="location-section" className="py-20 sm:py-28 bg-[#FAF7F2] relative px-4 sm:px-6 lg:px-8 border-t border-[#EAE3D3]">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EB] border border-[#E0D8C7] text-[#8A641A] text-[11px] font-montserrat tracking-[0.25em] uppercase mb-3 font-bold">
            <MapPin className="w-3 h-3 text-[#8A641A]" />
            <span>Flagship Atelier & Lounge</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#1C1814] tracking-wide uppercase">
            Visit The Atelier
          </h2>
          
          <p className="mt-3 font-sans text-xs sm:text-base text-[#5C5348] max-w-xl mx-auto leading-relaxed">
            Experience the collection in person at our flagship studio in Bandra, Mumbai. Private fitting suites, artisan espresso, and bespoke styling consultations by appointment.
          </p>
        </div>

        {/* 2-Column Grid: Left is Store Details & VIP Booking, Right is Interactive Luxury Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details & Booking */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Store Information Cards */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D8C7] shadow-sm space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-center text-[#8A641A] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-[#1C1814] uppercase">Studio Address</h4>
                  <p className="text-xs sm:text-sm text-[#5C5348] mt-1">{STORE_INFO.address}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF5EB] border border-[#E0D8C7] flex items-center justify-center text-[#8A641A] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-[#1C1814] uppercase">Atelier Hours</h4>
                  <p className="text-xs sm:text-sm text-[#5C5348] mt-1">{STORE_INFO.hours}</p>
                </div>
              </div>

              {/* Contact Direct */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EBF5EE] border border-[#25D366]/30 flex items-center justify-center text-[#15803d] shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-[#1C1814] uppercase">VIP WhatsApp Concierge</h4>
                  <p className="text-xs sm:text-sm text-[#5C5348] mt-1">{STORE_INFO.whatsappDisplay}</p>
                  <a
                    href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20Gen%27Z%20Studio!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playLuxuryClick()}
                    className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#15803d] hover:underline"
                  >
                    <span>Message VIP Stylist</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* VIP Appointment Booking Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E0D8C7] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#8A641A]" />
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#1C1814] uppercase">
                  Reserve Private Fitting Suite
                </h3>
              </div>

              <form onSubmit={handleBookVIP} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-cinzel tracking-wider text-[#7A7064] uppercase mb-1 font-bold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel tracking-wider text-[#7A7064] uppercase mb-1 font-bold">
                    Preferred Date & Time
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Friday, Sept 5 at 4:00 PM"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-cinzel tracking-wider text-[#7A7064] uppercase mb-1 font-bold">
                    Styling Interests (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Footwear sizing, bespoke gold polo embroidery"
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E0D8C7] text-xs text-[#1C1814] placeholder-[#9E9588] focus:outline-none focus:border-[#B88E38]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gold-btn text-white font-cinzel text-xs font-bold uppercase tracking-wider shadow-sm hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {bookingSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Reservation Requested!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Book VIP Atelier Session</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Stylized Luxury Map */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#E0D8C7] shadow-sm bg-[#F5EFE6] h-[480px] sm:h-[580px] flex flex-col justify-between p-6">
              
              {/* Map Graphic Matrix */}
              <div className="absolute inset-0 bg-[#FAF7F2]">
                {/* Simulated Street Grid */}
                <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-soft" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D4AF37" strokeWidth="0.75" strokeOpacity="0.35" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-soft)" />
                  {/* Street Avenues */}
                  <line x1="0" y1="180" x2="100%" y2="180" stroke="#8A641A" strokeWidth="2" strokeOpacity="0.3" />
                  <line x1="0" y1="360" x2="100%" y2="360" stroke="#8A641A" strokeWidth="2" strokeOpacity="0.3" />
                  <line x1="220" y1="0" x2="220" y2="100%" stroke="#8A641A" strokeWidth="2.5" strokeOpacity="0.3" />
                  <line x1="440" y1="0" x2="440" y2="100%" stroke="#8A641A" strokeWidth="2" strokeOpacity="0.25" />
                </svg>

                {/* Ambient Spotlight Pin Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#B88E38]/15 rounded-full blur-3xl" />
              </div>

              {/* Pin Center Marker */}
              <div className="relative z-10 my-auto mx-auto flex flex-col items-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  className="relative"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#B88E38] via-[#D4AF37] to-[#F3E5AB] p-1 shadow-[0_4px_20px_rgba(184,142,56,0.4)]">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <span className="font-script text-2xl text-[#8A641A]">G'Z</span>
                    </div>
                  </div>
                  {/* Pin Point */}
                  <div className="w-4 h-4 bg-[#B88E38] rotate-45 mx-auto -mt-2 shadow-md" />
                </motion.div>

                {/* Marker Info Card */}
                <div className="mt-3 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E0D8C7] shadow-lg text-center">
                  <p className="font-cinzel text-xs font-bold text-[#8A641A] uppercase tracking-wider">
                    Gen'Z Studio Flagship Atelier
                  </p>
                  <p className="text-[10px] text-[#5C5348]">Waterfield Road, Bandra West, Mumbai</p>
                </div>
              </div>

              {/* Map Footer Overlays */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E0D8C7] shadow-md">
                <div>
                  <p className="font-cinzel text-xs font-bold text-[#1C1814] uppercase">Valet Parking & Private Entry</p>
                  <p className="text-[10px] text-[#7A7064]">Complimentary for VIP appointments</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playLuxuryClick()}
                  className="px-4 py-2 rounded-xl bg-gold-btn text-white font-cinzel text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Open Directions</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
