/*
 * DESIGN: Botanical Editorial — Magazine-Inspired Organic Elegance
 * Palette: sage green (#4A5D4E), cream (#FDF8F0), dusty rose (#C4A08A), charcoal (#2C2C2C)
 * Typography: Playfair Display (display) + DM Sans (body)
 * Layout: Asymmetric editorial, full-bleed imagery, generous whitespace
 */

import { useEffect, useRef, useState, createContext, useContext } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Truck,
  Flower2,
  PartyPopper,
  Heart,
  Send,
  Instagram,
  Facebook,
  ChevronDown,
  Sparkles,
  MessageCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";

// Image assets (placeholders)
const HERO_IMG = "/instagram/2.jpg";
const BOUQUET_IMG = "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80";
const EVENT_IMG = "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80";
const LOGO_IMG = "/instagram/5.jpg";

// Real Instagram images (local preview)
// Завантажте свої фото у папку client/public/instagram і використовуйте імена 1.jpg, 2.jpg, 3.jpg тощо.
const INSTAGRAM_PHOTOS_DIR = "/instagram";
const IG_BOUQUET_ROSES = `${INSTAGRAM_PHOTOS_DIR}/1.jpg`;
const IG_FLOWER_ARRANGEMENT = `${INSTAGRAM_PHOTOS_DIR}/2.jpg`;
const IG_PRINCESS_BOUQUET = `${INSTAGRAM_PHOTOS_DIR}/3.jpg`;
const IG_EASTER_DECOR = `${INSTAGRAM_PHOTOS_DIR}/4.jpg`;
const IG_DRIED_FLOWERS = `${INSTAGRAM_PHOTOS_DIR}/5.jpg`;
const IG_BALLOONS = `${INSTAGRAM_PHOTOS_DIR}/6.jpg`;
const IG_CHRISTENING = `${INSTAGRAM_PHOTOS_DIR}/7.jpg`;
const IG_BOUQUET_TENDER = `${INSTAGRAM_PHOTOS_DIR}/8.jpg`;
const IG_WEDDING_SETUP = `${INSTAGRAM_PHOTOS_DIR}/9.jpg`;
const IG_PINK_MIX = `${INSTAGRAM_PHOTOS_DIR}/4.jpg`;
const IG_PHOTO_10 = `${INSTAGRAM_PHOTOS_DIR}/10.jpg`;
const IG_PHOTO_11 = `${INSTAGRAM_PHOTOS_DIR}/11.jpg`;

// Carousel images
const DECOR_CAROUSEL = [
  { src: IG_BALLOONS, alt: "Повітряні кульки та арки" },
  { src: IG_CHRISTENING, alt: "Святковий декор від My Flowers" },
  { src: IG_BOUQUET_TENDER, alt: "Авторський букет від My Flowers" },
  { src: IG_WEDDING_SETUP, alt: "Весільне оформлення" },
];

// CTA phone number
const PHONE = "+380664777329";
const PHONE_DISPLAY = "+380 66 477 7329";
const ADDRESS = "вул. Василя Стуса, 26, Хирів";
const INSTAGRAM = "https://www.instagram.com/my_flowers_decor/";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61566498498498";
const GOOGLE_MAPS = "https://www.google.com/maps/search/%D0%9A%D0%B2%D1%96%D1%82%D0%B8+%D0%A5%D0%B8%D1%80%D1%96%D0%B2+My+Flowers";

// ─── MODAL CONTEXT ───
const ModalContext = createContext<{
  openOrderModal: () => void;
}>({
  openOrderModal: () => {},
});

function useOrderModal() {
  return useContext(ModalContext);
}

// Reusable CTA button — on mobile opens OrderModal, on desktop uses tel:
function CTAButton({ className = "", size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const isMobile = useIsMobile();
  const { openOrderModal } = useOrderModal();

  if (isMobile) {
    return (
      <Button
        size={size}
        onClick={openOrderModal}
        className={`bg-sage hover:bg-sage-light text-cream font-sans font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-sage/20 ${className}`}
      >
        <Phone className="w-4 h-4 mr-2" />
        Замовити букет
      </Button>
    );
  }

  return (
    <Button
      asChild
      size={size}
      className={`bg-sage hover:bg-sage-light text-cream font-sans font-semibold tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-sage/20 ${className}`}
    >
      <a href={`tel:${PHONE}`}>
        <Phone className="w-4 h-4 mr-2" />
        Замовити букет
      </a>
    </Button>
  );
}

// Fade-in animation wrapper
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ORDER MODAL (Lead Capture Window) ───
function OrderModal({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Будь ласка, заповніть ім'я та телефон");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Дякуємо! Ми зв'яжемось з вами найближчим часом.");
      setFormData({ name: "", phone: "", message: "" });
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[520px] p-0 bg-cream border-sage/20 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with sage background */}
        <div className="bg-sage px-8 pt-8 pb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <img src={LOGO_IMG} alt="My Flowers" className="w-12 h-12 object-contain" />
              <span className="text-cream/80 text-sm font-medium tracking-wide uppercase">My Flowers</span>
            </div>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl md:text-3xl font-bold text-cream leading-tight text-left">
                Замовити букет
              </DialogTitle>
              <DialogDescription className="text-cream/70 text-base mt-2 text-left">
                Залиште заявку і ми зв'яжемось з вами протягом 15 хвилин
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* Form body */}
        <form onSubmit={handleSubmit} className="px-8 pb-8 pt-2">
          <div className="space-y-4">
            <div>
              <label className="block text-charcoal text-sm font-medium mb-2">
                Ваше ім'я <span className="text-rose">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Як до вас звертатись?"
                className="w-full px-4 py-3 rounded-xl bg-white border border-sage/20 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-2">
                Телефон <span className="text-rose">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+380..."
                className="w-full px-4 py-3 rounded-xl bg-white border border-sage/20 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-charcoal text-sm font-medium mb-2">
                Повідомлення
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Опишіть ваше замовлення або побажання..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white border border-sage/20 text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-sage hover:bg-sage-light text-cream font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                "Відправляємо..."
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Відправити заявку
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-sage/10">
            <span className="text-charcoal-light text-sm">Або зателефонуйте:</span>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 text-sage hover:text-sage-light font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <p className="text-charcoal-light/50 text-xs mt-4 text-center">
            Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── NAVIGATION ───
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Послуги", href: "#services" },
    { label: "Галерея", href: "#gallery" },
    { label: "Відгуки", href: "#reviews" },
    { label: "Контакти", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-sage/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img src={LOGO_IMG} alt="My Flowers — квіткова студія" className="h-14 md:h-16 w-auto object-contain" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-sage ${
                scrolled ? "text-charcoal-light" : "text-cream/90"
              }`}
            >
              {link.label}
            </a>
          ))}
          <CTAButton size="default" />
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${
            scrolled ? "text-charcoal" : "text-cream"
          }`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cream/98 backdrop-blur-lg border-b border-sage/10 px-6 pb-6 pt-2"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-charcoal font-medium border-b border-sage/10 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-4">
            <CTAButton className="w-full justify-center" />
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// ─── HERO ───
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="My Flowers — квіткова студія в Хирові"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container grid lg:grid-cols-2 gap-8 items-center pt-24 pb-16">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/15 backdrop-blur-sm text-cream/90 text-sm font-medium mb-6 border border-cream/20">
              <Sparkles className="w-3.5 h-3.5" />
              Квіткова студія в Хирові
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-cream leading-[1.1] mb-6"
          >
            Даруємо радість
            <br />
            <span className="text-rose italic font-medium">навіть на відстані</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-cream/80 text-lg md:text-xl leading-relaxed mb-8 max-w-md"
          >
            Авторські букети, святковий декор та доставка квітів по Хирову, Добромилю та околицях. Кожен букет — маленький шедевр.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <CTAButton size="lg" className="text-base px-8 py-6" />
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/70 hover:text-cream transition-colors text-sm font-medium"
            >
              <Instagram className="w-4 h-4" />
              @my_flowers_decor
            </a>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex gap-8 mt-12 pt-8 border-t border-cream/15"
          >
            <div>
              <div className="flex items-center gap-1 text-rose mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-cream/60 text-xs font-medium">5.0 — Google</p>
            </div>
            <div>
              <p className="text-cream text-2xl font-serif font-bold">1.8k+</p>
              <p className="text-cream/60 text-xs font-medium">Підписників</p>
            </div>
            <div>
              <p className="text-cream text-2xl font-serif font-bold">20+</p>
              <p className="text-cream/60 text-xs font-medium">Відгуків</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-cream/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── VALUE PROPOSITION ───
function ValueProposition() {
  const features = [
    {
      icon: Flower2,
      title: "Авторські букети",
      description: "Кожна композиція створюється вручну з найсвіжіших квітів. Ми підбираємо кольори та текстури, щоб кожен букет був унікальним.",
    },
    {
      icon: Truck,
      title: "Швидка доставка",
      description: "Доставляємо по Хирову, Добромилю та околицях. Ваш букет буде доставлений свіжим та вчасно — прямо до дверей.",
    },
    {
      icon: PartyPopper,
      title: "Декор та оформлення",
      description: "Повітряні кульки, фотозони та святковий декор. Створюємо атмосферу свята для будь-якої події.",
    },
    {
      icon: Heart,
      title: "Індивідуальний підхід",
      description: "Враховуємо всі ваші побажання. Від класичних букетів до сучасних трендових композицій — втілимо будь-яку ідею.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
              Чому обирають нас
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
              Більше, ніж просто квіти
            </h2>
            <p className="text-charcoal-light text-lg leading-relaxed">
              My Flowers — це повний спектр святкових послуг. Від вишуканих авторських букетів до повного оформлення вашого свята.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 0.1}>
              <div className="group p-6 md:p-8 rounded-2xl bg-white border border-sage/10 hover:border-sage/25 transition-all duration-500 hover:shadow-xl hover:shadow-sage/5 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center mb-5 group-hover:bg-sage/15 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-sage" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── DECOR CAROUSEL ───
function DecorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % DECOR_CAROUSEL.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + DECOR_CAROUSEL.length) % DECOR_CAROUSEL.length);
  };

  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-sage/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={DECOR_CAROUSEL[currentIndex].src}
              alt={DECOR_CAROUSEL[currentIndex].alt}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-charcoal transition-all"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-charcoal transition-all"
          >
            →
          </button>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {DECOR_CAROUSEL.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentIndex ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative accents */}
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-sage/15 -z-10" />
      <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-rose/20 -z-10" />
    </div>
  );
}

// ─── SERVICES / ABOUT ───
function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-white">
      <div className="container">
        {/* Service 1: Bouquets — text only */}
        <div className="mb-24 md:mb-32">
          <FadeIn>
            <div className="rounded-3xl border border-sage/10 bg-white shadow-2xl shadow-sage/10 p-10">
              <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
                Наші букети
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-6">
                Кожен букет — <span className="text-sage italic">маленький шедевр</span>
              </h2>
              <p className="text-charcoal-light text-lg leading-relaxed mb-6">
                Ми створюємо авторські букети з найсвіжіших сезонних квітів. Від класичних троянд до трендових тюльпанів у незвичних відтінках — кожна композиція продумана до дрібниць.
              </p>
              <ul className="space-y-3 mb-8">
                {["Сезонні та екзотичні квіти", "Букети на будь-який бюджет", "Сухоцвіти та стабілізовані квіти", "Індивідуальне замовлення"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-charcoal-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <CTAButton size="lg" />
            </div>
          </FadeIn>
        </div>

        {/* Service 2: Event decor — text left, image right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div>
              <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
                Декор та оформлення
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-6">
                Створюємо{" "}
                <span className="text-sage italic">атмосферу свята</span>
              </h2>
              <p className="text-charcoal-light text-lg leading-relaxed mb-6">
                Повітряні кульки, фотозони, святковий декор — ми допоможемо зробити вашу подію незабутньою. Від дня народження до весілля — оформимо будь-яке свято.
              </p>
              <ul className="space-y-3 mb-8">
                {["Повітряні кульки та арки", "Фотозони на замовлення", "Великодній та сезонний декор", "Доставка та монтаж"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-3 text-charcoal-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
              <CTAButton size="lg" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="order-1 lg:order-2">
            <DecorCarousel />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY (Real Instagram Photos) ───
function Gallery() {
  const images = [
    { src: IG_BOUQUET_ROSES, alt: "Букет з кущових троянд та гортензій", tall: true },
    { src: IG_FLOWER_ARRANGEMENT, alt: "Ніжний букет з білих троянд та еустоми", tall: true },
    { src: IG_PRINCESS_BOUQUET, alt: "Ніжний букет з гортензій та троянд", tall: true },
    { src: IG_PINK_MIX, alt: "Букет мікс у рожевих кольорах", tall: true },
    { src: IG_PHOTO_10, alt: "Авторський букет від My Flowers", tall: true },
  ];

  return (
    <section id="gallery" className="py-24 md:py-32 bg-cream-dark">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
              Наші роботи
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
              Реальні роботи з Instagram
            </h2>
            <p className="text-charcoal-light text-lg">
              Кожна композиція — це поєднання натхнення, свіжих квітів та уваги до деталей. Ось деякі з наших останніх робіт.
            </p>
          </div>
        </FadeIn>

        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {images.map((img, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="break-inside-avoid group relative overflow-hidden rounded-2xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-cream text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage hover:text-sage-light font-medium transition-colors"
            >
              <Instagram className="w-5 h-5" />
              Більше робіт в Instagram
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── REVIEWS / SOCIAL PROOF ───
function Reviews() {
  const reviews = [
    {
      name: "Оксана М.",
      text: "Замовляла букет на день народження мами — просто неймовірний! Квіти свіжі, композиція дуже гарна. Доставили вчасно. Дуже дякую!",
      rating: 5,
    },
    {
      name: "Андрій К.",
      text: "Чудовий магазин! Завжди свіжі квіти та привітний сервіс. Замовляю вже не вперше і завжди задоволений результатом.",
      rating: 5,
    },
    {
      name: "Марія Л.",
      text: "Оформлення свята було просто казковим! Фотозона, кульки, квіти — все ідеально поєднувалось. Гості були в захваті. Рекомендую!",
      rating: 5,
    },
  ];

  return (
    <section id="reviews" className="py-24 md:py-32 bg-white">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
              Відгуки
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
              Що кажуть наші клієнти
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-rose fill-rose" />
                ))}
              </div>
              <span className="text-charcoal font-serif text-2xl font-bold">5.0</span>
            </div>
            <p className="text-charcoal-light">
              20+ відгуків на Google Maps
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="p-8 rounded-2xl bg-cream border border-sage/10 hover:border-sage/20 transition-all duration-500 hover:shadow-lg hover:shadow-sage/5">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-rose fill-rose" />
                  ))}
                </div>
                <p className="text-charcoal-light leading-relaxed mb-6 italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <span className="text-sage font-serif font-bold text-sm">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-charcoal font-medium text-sm">{review.name}</p>
                    <p className="text-charcoal-light text-xs">Google Maps</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <a
              href={GOOGLE_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage hover:text-sage-light font-medium transition-colors"
            >
              <Star className="w-4 h-4" />
              Читати всі відгуки на Google Maps
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CONTACT INFO SECTION (replaces inline form) ───
function ContactInfo() {
  const { openOrderModal } = useOrderModal();
  const isMobile = useIsMobile();

  return (
    <section className="py-24 md:py-32 bg-sage relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-cream/70 font-medium text-sm tracking-widest uppercase mb-4 block">
              Зв'яжіться з нами
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
              Готові замовити
              <br />
              <span className="text-rose italic">ідеальний букет?</span>
            </h2>
            <p className="text-cream/80 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Ваш особистий флорист на відстані одного дзвінка
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-4 justify-center mb-12">
              {isMobile ? (
                <>
                  <Button
                    size="lg"
                    onClick={openOrderModal}
                    className="bg-cream text-sage hover:bg-cream/90 font-sans font-semibold tracking-wide px-10 py-6 text-base transition-all duration-300 hover:shadow-lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Замовити букет
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    onClick={openOrderModal}
                    className="border-cream/30 text-cream hover:bg-cream/10 px-8 py-6 font-sans"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {PHONE_DISPLAY}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    asChild
                    size="lg"
                    className="bg-cream text-sage hover:bg-cream/90 font-sans font-semibold tracking-wide px-10 py-6 text-base transition-all duration-300 hover:shadow-lg"
                  >
                    <a href={`tel:${PHONE}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      Замовити букет
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-cream/30 text-cream hover:bg-cream/10 px-8 py-6 font-sans"
                  >
                    <a href={`tel:${PHONE}`}>
                      <Phone className="w-4 h-4 mr-2" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Phone className="w-6 h-6 text-cream" />
                <div className="text-center">
                  <p className="text-cream/60 text-sm mb-1">Телефон</p>
                  <a href={`tel:${PHONE}`} className="text-cream font-semibold hover:text-rose transition-colors">
                    {PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <MapPin className="w-6 h-6 text-cream" />
                <div className="text-center">
                  <p className="text-cream/60 text-sm mb-1">Адреса</p>
                  <p className="text-cream font-semibold text-sm">{ADDRESS}</p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
                <Clock className="w-6 h-6 text-cream" />
                <div className="text-center">
                  <p className="text-cream/60 text-sm mb-1">Графік роботи</p>
                  <p className="text-cream font-semibold text-sm">Пн-Сб: 09:00 — 19:00</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex gap-4 justify-center mt-8">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── MAP SECTION ───
function MapSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-cream">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">
              Як нас знайти
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">
              Завітайте до нас
            </h2>
            <p className="text-charcoal-light text-lg">
              {ADDRESS}, Львівська область, 82060
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-sage/10 border border-sage/10">
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=%D0%9A%D0%B2%D1%96%D1%82%D0%B8+%D0%A5%D0%B8%D1%80%D1%96%D0%B2+My+Flowers&zoom=16&language=uk"
              width="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="My Flowers на карті"
              className="w-full h-[320px] sm:h-[380px] md:h-[450px]"
            />
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid sm:grid-cols-3 gap-6 mt-12">
            <a
              href={`tel:${PHONE}`}
              className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-sage/10 hover:border-sage/25 transition-all duration-300 hover:shadow-lg hover:shadow-sage/5"
            >
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-charcoal font-medium text-sm">Телефон</p>
                <p className="text-sage font-semibold">{PHONE_DISPLAY}</p>
              </div>
            </a>

            <a
              href={GOOGLE_MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-sage/10 hover:border-sage/25 transition-all duration-300 hover:shadow-lg hover:shadow-sage/5"
            >
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-charcoal font-medium text-sm">Адреса</p>
                <p className="text-sage font-semibold text-sm">{ADDRESS}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border border-sage/10">
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-sage" />
              </div>
              <div>
                <p className="text-charcoal font-medium text-sm">Графік роботи</p>
                <p className="text-sage font-semibold text-sm">Пн-Сб: 09:00 — 19:00</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FINAL CTA BANNER ───
function FinalCTA() {
  const { openOrderModal } = useOrderModal();

  return (
    <section className="py-20 md:py-28 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage blur-[150px]" />
      </div>

      <div className="container relative text-center">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
            Замовте букет
            <br />
            <span className="text-rose italic">прямо зараз</span>
          </h2>
          <p className="text-cream/70 text-lg max-w-lg mx-auto mb-10">
            Потрібен букет? Дзвоніть зараз, ми раді допомогти!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton size="lg" className="text-base px-10 py-6" />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-cream/30 text-cream hover:bg-cream/10 px-8 py-6 font-sans"
            >
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Написати в Instagram
              </a>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FOOTER ───
function Footer() {
  return (
    <footer className="py-12 bg-charcoal border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={IG_PHOTO_11} alt="My Flowers — квіткова студія" className="h-20 w-auto object-contain" />
          </div>

          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-cream transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-cream transition-colors"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href={`tel:${PHONE}`}
              className="text-cream/50 hover:text-cream transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <p className="text-cream text-sm">
            &copy; {new Date().getFullYear()} My Flowers Decor Khyriv
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───
export default function Home() {
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const openOrderModal = () => setOrderModalOpen(true);

  return (
    <ModalContext.Provider value={{ openOrderModal }}>
      <div className="min-h-screen">
        <Navigation />
        <Hero />
        <ValueProposition />
        <Services />
        <Gallery />
        <Reviews />
        <ContactInfo />
        <MapSection />
        <FinalCTA />
        <Footer />

        {/* Order Modal — accessible from any CTA */}
        <OrderModal open={orderModalOpen} onOpenChange={setOrderModalOpen} />
      </div>
    </ModalContext.Provider>
  );
}
