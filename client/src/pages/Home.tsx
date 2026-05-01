/*
 * DESIGN: Botanical Editorial — Magazine-Inspired Organic Elegance
 * Palette: sage green (#4A5D4E), cream (#FDF8F0), dusty rose (#C4A08A), charcoal (#2C2C2C)
 * Typography: Playfair Display (display) + DM Sans (body)
 * Layout: Asymmetric editorial, full-bleed imagery, generous whitespace
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Truck,
  Flower2,
  PartyPopper,
  Heart,
  Instagram,
  Facebook,
  ChevronDown,
  Sparkles,
  MessageCircle,
} from "lucide-react";

// Image assets (placeholders)
const HERO_IMG = "/instagram/2.jpg";
const LOGO_IMG = "/instagram/5.jpg";

// Real Instagram images (local preview)
// Завантажте свої фото у папку client/public/instagram і використовуйте імена 1.jpg, 2.jpg, 3.jpg тощо.
const INSTAGRAM_PHOTOS_DIR = "/instagram";
const IG_BOUQUET_ROSES = `${INSTAGRAM_PHOTOS_DIR}/1.jpg`;
const IG_FLOWER_ARRANGEMENT = `${INSTAGRAM_PHOTOS_DIR}/2.jpg`;
const IG_PRINCESS_BOUQUET = `${INSTAGRAM_PHOTOS_DIR}/3.jpg`;
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
const TIKTOK = "https://www.tiktok.com/@my_flowers_2024?_r=1&_t=ZM-92dQLkmLATo&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn9nB6J_yy-hmlvxVqtVoXcUr12XC9J2gHX9X0DfM8N5Zfo-N7xjjiT8pL0Ig_aem_TYiKsBbRAShBLMlNDK3emg";
const FACEBOOK = "https://www.facebook.com/profile.php?id=61566498498498";
const GOOGLE_MAPS = "https://www.google.com/maps/search/%D0%9A%D0%B2%D1%96%D1%82%D0%B8+%D0%A5%D0%B8%D1%80%D1%96%D0%B2+My+Flowers";

function CTAButton({ className = "", size = "default" }: { className?: string; size?: "default" | "lg" }) {
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
        scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-sage/10" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center group">
          <img src={LOGO_IMG} alt="My Flowers — квіткова студія" className="h-14 md:h-16 w-auto object-contain" />
        </a>

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

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 transition-colors ${scrolled ? "text-charcoal" : "text-cream"}`}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "opacity-0" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled ? "bg-charcoal" : "bg-cream"}`} />
        </button>
      </div>

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
      <div className="absolute inset-0">
        <img src={HERO_IMG} alt="My Flowers — квіткова студія в Хирові" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/50 to-transparent" />
      </div>

      <div className="relative container grid lg:grid-cols-2 gap-8 items-center pt-24 pb-16">
        <div className="max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
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
            initial={{ opacity: 0, y: 0 }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
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
      description:
        "Кожна композиція створюється вручну з найсвіжіших квітів. Ми підбираємо кольори та текстури, щоб кожен букет був унікальним.",
    },
    {
      icon: Truck,
      title: "Швидка доставка",
      description:
        "Доставляємо по Хирову, Добромилю та околицях. Ваш букет буде доставлений свіжим та вчасно — прямо до дверей.",
    },
    {
      icon: PartyPopper,
      title: "Декор та оформлення",
      description: "Повітряні кульки, фотозони та святковий декор. Створюємо атмосферу свята для будь-якої події.",
    },
    {
      icon: Heart,
      title: "Індивідуальний підхід",
      description:
        "Враховуємо всі ваші побажання. Від класичних букетів до сучасних трендових композицій — втілимо будь-яку ідею.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="container">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Чому обирають нас</span>
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
                <h3 className="font-serif text-xl font-semibold text-charcoal mb-3">{feature.title}</h3>
                <p className="text-charcoal-light text-sm leading-relaxed">{feature.description}</p>
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

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % DECOR_CAROUSEL.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + DECOR_CAROUSEL.length) % DECOR_CAROUSEL.length);

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

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {DECOR_CAROUSEL.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>

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
        <div className="mb-24 md:mb-32">
          <FadeIn>
            <div className="rounded-3xl border border-sage/10 bg-white shadow-2xl shadow-sage/10 p-10">
              <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Наші букети</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-6">
                Кожен букет — <span className="text-sage italic">маленький шедевр</span>
              </h2>
              <p className="text-charcoal-light text-lg leading-relaxed mb-6">
                Ми створюємо авторські букети з найсвіжіших сезонних квітів. Від класичних троянд до трендових тюльпанів у незвичних відтінках — кожна композиція продумана до дрібниць.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Сезонні та екзотичні квіти",
                  "Букети на будь-який бюджет",
                  "Сухоцвіти та стабілізовані квіти",
                  "Індивідуальне замовлення",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-charcoal-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <CTAButton size="lg" />
            </div>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn className="order-2 lg:order-1">
            <div>
              <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Декор та оформлення</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-charcoal leading-tight mb-6">
                Створюємо <span className="text-sage italic">атмосферу свята</span>
              </h2>
              <p className="text-charcoal-light text-lg leading-relaxed mb-6">
                Повітряні кульки, фотозони, святковий декор — ми допоможемо зробити вашу подію незабутньою. Від дня народження до весілля — оформимо будь-яке свято.
              </p>
              <ul className="space-y-3 mb-8">
                {["Повітряні кульки та арки", "Фотозони на замовлення", "Великодній та сезонний декор", "Доставка та монтаж"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-charcoal-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose shrink-0" />
                    {item}
                  </li>
                ))}
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
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Наші роботи</span>
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
                <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-cream text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="text-center mt-12">
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sage hover:text-sage-light font-medium transition-colors">
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
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Відгуки</span>
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
            <p className="text-charcoal-light">20+ відгуків на Google Maps</p>
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
                <p className="text-charcoal-light leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center">
                    <span className="text-sage font-serif font-bold text-sm">{review.name.charAt(0)}</span>
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
            <a href={GOOGLE_MAPS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sage hover:text-sage-light font-medium transition-colors">
              <Star className="w-4 h-4" />
              Читати всі відгуки на Google Maps
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── CONTACT INFO SECTION ───
function ContactInfo() {
  return (
    <section className="py-24 md:py-32 bg-sage relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="container relative">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <span className="text-cream/70 font-medium text-sm tracking-widest uppercase mb-4 block">Зв'яжіться з нами</span>
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
              <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M16.6 5.82c.06.45.27.97.63 1.55.78 1.24 1.86 2 3.2 2.25v2.64c-1.3.01-2.62-.33-3.8-1.01v5.92c0 3.3-2.68 5.98-5.98 5.98A5.98 5.98 0 0 1 5 17.17c0-3.3 2.68-5.98 5.98-5.98.28 0 .55.02.82.06v2.77a3.1 3.1 0 1 0 2.27 2.99V1h2.53c.03 1.06.3 2.08.79 3.08.55 1.1 1.38 1.7 2.51 1.74v2.66c-1.63-.05-3.1-.57-4.3-1.66z" />
                </svg>
              </a>
              <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-cream transition-colors">
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
            <span className="text-sage font-medium text-sm tracking-widest uppercase mb-4 block">Як нас знайти</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-tight mb-6">Завітайте до нас</h2>
            <p className="text-charcoal-light text-lg">{ADDRESS}, Львівська область, 82060</p>
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
          <p className="text-cream/70 text-lg max-w-lg mx-auto mb-10">Потрібен букет? Дзвоніть зараз, ми раді допомогти!</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <CTAButton size="lg" className="text-base px-10 py-6" />
            <Button asChild variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream/10 px-8 py-6 font-sans">
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
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href={TIKTOK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-cream transition-colors"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M16.6 5.82c.06.45.27.97.63 1.55.78 1.24 1.86 2 3.2 2.25v2.64c-1.3.01-2.62-.33-3.8-1.01v5.92c0 3.3-2.68 5.98-5.98 5.98A5.98 5.98 0 0 1 5 17.17c0-3.3 2.68-5.98 5.98-5.98.28 0 .55.02.82.06v2.77a3.1 3.1 0 1 0 2.27 2.99V1h2.53c.03 1.06.3 2.08.79 3.08.55 1.1 1.38 1.7 2.51 1.74v2.66c-1.63-.05-3.1-.57-4.3-1.66z" />
              </svg>
            </a>
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-cream/50 hover:text-cream transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={`tel:${PHONE}`} className="text-cream/50 hover:text-cream transition-colors">
              <Phone className="w-5 h-5" />
            </a>
          </div>

          <p className="text-cream text-sm">&copy; {new Date().getFullYear()} My Flowers Decor Khyriv</p>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ───
export default function Home() {
  return (
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
    </div>
  );
}
