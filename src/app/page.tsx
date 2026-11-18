"use client";

import React, { useState, useEffect, useRef } from "react";
import Hero from "@/components/ui/animated-shader-hero";
import {
  Smartphone,
  TrendingDown,
  TrendingUp,
  Coins,
  AlertTriangle,
  ArrowRight,
  Layers,
  Database,
  Globe,
  Radio,
  BookOpen,
  PieChart,
  Award,
  Newspaper,
  Trophy,
  Target,
  Rocket,
  CheckCircle2,
  Zap,
  Sparkles,
  Laptop,
  ShieldCheck,
  BarChart3,
  Flame,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --- ЭКСПЕРИМЕНТ ДЕРЕКТЕРІ (Recharts) ---
interface ChartDataPoint {
  stage: string;
  shortName: string;
  control: number;
  nexra: number;
}

const experimentData: ChartDataPoint[] = [
  {
    stage: "Бастапқы тест (Pre-test)",
    shortName: "Бастапқы тест",
    control: 9,
    nexra: 9,
  },
  {
    stage: "Қорытынды тест (Post-test)",
    shortName: "Қорытынды тест",
    control: 15,
    nexra: 19,
  },
];

// --- КАРТОЧКАЛАР ТІЗІМІ МЕН МЕТАДЕРЕКТЕРІ ---
interface SlideInfo {
  id: string;
  number: string;
  tag: string;
  title: string;
}

const SLIDES: SlideInfo[] = [
  {
    id: "card-problem",
    number: "01",
    tag: "ІЛГЕК ЖӘНЕ МӘСЕЛЕ",
    title: "Тұтыну vs Инвестиция",
  },
  {
    id: "card-platform",
    number: "02",
    tag: "ПЛАТФОРМА",
    title: "Nexra Симуляторы",
  },
  {
    id: "card-experiment",
    number: "03",
    tag: "ЭКСПЕРИМЕНТ ЖӘНЕ НӘТИЖЕ",
    title: "6 Апталық Зерттеу",
  },
  {
    id: "card-conclusion",
    number: "04",
    tag: "ҚОРЫТЫНДЫ",
    title: "Стратегиялық Түйін",
  },
];

export default function ScientificLandingPage() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // SSR Hydration Warning-ті болдырмау үшін
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useInView арқылы активті карточканы қадағалау
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const inView1 = useInView(card1Ref, { margin: "-35% 0px -35% 0px" });
  const inView2 = useInView(card2Ref, { margin: "-35% 0px -35% 0px" });
  const inView3 = useInView(card3Ref, { margin: "-35% 0px -35% 0px" });
  const inView4 = useInView(card4Ref, { margin: "-35% 0px -35% 0px" });

  useEffect(() => {
    if (inView4) setActiveCard(3);
    else if (inView3) setActiveCard(2);
    else if (inView2) setActiveCard(1);
    else if (inView1) setActiveCard(0);
  }, [inView1, inView2, inView3, inView4]);

  const scrollToSlide = (index: number) => {
    const refs = [card1Ref, card2Ref, card3Ref, card4Ref];
    refs[index]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#FF6B00] selection:text-white">

      {/* =========================================================================
          ШАГ 1: HERO SECTION (animated-shader-hero.tsx)
          Эмодзилер алынып тасталған, төменгі бөлігінде ақшыл тақырыпқа тегіс өту градиенті бар
          ========================================================================= */}
      <section id="hero-section" className="relative">
        <Hero
          headline={{
            line1: "Nexra",
            line2: "Инвестициялық симулятор",
          }}
          subtitle="Қаржылық сауаттылықты дамытатын виртуалды платформа. Автор: Еркін Ақзейнеп, 11 сынып"
          trustBadge={{
            text: "ҒЫЛЫМИ ЖОБА",
          }}
          buttons={{
            primary: {
              text: "Жобамен танысу",
              onClick: () => {
                const target = document.getElementById("scrollytelling");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                }
              },
            },
          }}
        />
      </section>

      {/* =========================================================================
          ШАГ 2 ЖӘНЕ 3: SCROLLYTELLING LAYOUT (LIGHT MODE)
          Фон: bg-slate-50, Мәтін: text-slate-900, Акцент: #FF6B00
          ========================================================================= */}
      <section
        id="scrollytelling"
        className="relative bg-slate-50 text-slate-900 border-t border-slate-200"
      >
        {/* Жұмсақ жарық реңктері (Ambient light glow) */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-200/30 rounded-full blur-[140px] pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-200/30 rounded-full blur-[150px] pointer-events-none -z-0" />

        <div className="flex flex-col lg:flex-row relative max-w-7xl mx-auto">
          {/* ---------------------------------------------------------------------
              СОЛ ЖАҚ БАҒАН: СТИКИ МЕДИА-БЛОК (Light Mode Card, 50% Desktop)
              --------------------------------------------------------------------- */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 z-20">
            {/* Медиа-контейнер (Ақшыл Glassmorphism + Нәзік көлеңке) */}
            <div className="w-full max-w-xl aspect-square sm:aspect-[4/3] lg:aspect-square rounded-3xl bg-white border border-slate-200/80 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden group">
              {/* Контейнердің ішкі нәзік акценттік жарқылы */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-100/60 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

              {/* Медианың жоғарғы мәртебелік жолы */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs text-slate-500 z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
                  <span className="font-bold tracking-wider uppercase text-slate-700">
                    {SLIDES[activeCard].tag}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#FF6B00] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200 font-bold">
                  <span>ҚАДАМ</span>
                  <span>0{activeCard + 1} / 04</span>
                </div>
              </div>

              {/* МЕДИА-БЛОК: ПЛАВНЫЙ CROSSFADE СМЕНАСЫ */}
              <div className="relative w-full flex-1 my-3 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeCard === 0 && (
                    <motion.div
                      key="media-0"
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <MediaCard1Problem />
                    </motion.div>
                  )}

                  {activeCard === 1 && (
                    <motion.div
                      key="media-1"
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <MediaCard2Platform />
                    </motion.div>
                  )}

                  {activeCard === 2 && (
                    <motion.div
                      key="media-2"
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <MediaCard3Chart isMounted={isMounted} />
                    </motion.div>
                  )}

                  {activeCard === 3 && (
                    <motion.div
                      key="media-3"
                      initial={{ opacity: 0, scale: 0.94, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.94, y: -15 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-center"
                    >
                      <MediaCard4Conclusion />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Медианың төменгі индикаторы */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 z-10">
                <span className="flex items-center gap-1.5 truncate font-medium">
                  <Radio className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>Интерактивті ғылыми визуализация</span>
                </span>
                <span className="text-slate-400 font-mono">
                  Nexra Engine v1.0
                </span>
              </div>
            </div>

            {/* Дисплей астындағы скролл прогресс сызығы (Light Mode) */}
            <div className="w-full max-w-xl mt-4 px-2 hidden sm:flex items-center justify-between gap-2">
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  onClick={() => scrollToSlide(idx)}
                  className="flex-1 cursor-pointer group"
                >
                  <div className="h-1.5 rounded-full overflow-hidden bg-slate-200 transition-colors group-hover:bg-slate-300">
                    <div
                      className={`h-full transition-all duration-500 ${
                        activeCard === idx
                          ? "w-full bg-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.6)]"
                          : activeCard > idx
                          ? "w-full bg-orange-300"
                          : "w-0"
                      }`}
                    />
                  </div>
                  <span
                    className={`block mt-1 text-[10px] font-mono transition-colors ${
                      activeCard === idx
                        ? "text-[#FF6B00] font-bold"
                        : "text-slate-500"
                    }`}
                  >
                    0{idx + 1}. {slide.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------------------------------------------------------------
              ОҢ ЖАҚ БАҒАН: ТЕКСТТІК КАРТОЧКАЛАР (Light Mode)
              --------------------------------------------------------------------- */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {/* КАРТОЧКА 1: ІЛГЕК ЖӘНЕ МӘСЕЛЕ */}
            <div
              id="card-1"
              ref={card1Ref}
              className="min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 border-b lg:border-b-0 border-slate-200/70"
            >
              <div className="max-w-xl py-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs font-bold tracking-wider uppercase mb-6">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>01 / ІЛГЕК ЖӘНЕ МӘСЕЛЕ</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
                  Біз жаңа Айфон сатып аламыз.{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Ал сол компанияның бір акциясын ше?
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                  Біз ақша жұмсауды білеміз, ал ақшаның жұмыс істетуін ешкім үйретпейді.{" "}
                  <strong className="text-slate-900 font-bold underline decoration-[#FF6B00] underline-offset-4">
                    PISA 2022
                  </strong>{" "}
                  деректері бойынша{" "}
                  <span className="text-[#FF6B00] font-bold">~1/5 оқушылар</span>{" "}
                  қаржылық сауаттылықтың ең төменгі деңгейінде, ал теория мен
                  тәжірибе арасында үлкен алшақтық бар.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-rose-300 transition-all">
                    <div className="flex items-center gap-2 text-rose-600 mb-2 font-bold text-sm">
                      <Smartphone className="w-4 h-4" />
                      <span>Тұтыну парадигмасы</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Гаджеттер алғашқы күннен бастап құнсызданады. Жастар тек
                      тұтынушы рөлінде қалып қояды.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-300 transition-all">
                    <div className="flex items-center gap-2 text-[#FF6B00] mb-2 font-bold text-sm">
                      <Coins className="w-4 h-4" />
                      <span>Инвестор парадигмасы</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Акциялар капиталды көбейтеді және өндіруші экономиканың
                      өсіміне үлес қосуға үйретеді.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-orange-50/70 border-l-4 border-[#FF6B00] border-y border-r border-orange-100 text-xs sm:text-sm text-slate-800">
                  <span className="font-bold text-[#FF6B00]">PISA 2022 дабылы:</span>{" "}
                  Қазақстанда мектеп оқушыларының 20%-ға жуығы қарапайым отбасылық
                  бюджетті басқаруда ең қарапайым қаржылық шешімді қабылдай алмайды.
                </div>
              </div>
            </div>

            {/* КАРТОЧКА 2: ПЛАТФОРМА */}
            <div
              id="card-2"
              ref={card2Ref}
              className="min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 border-b lg:border-b-0 border-slate-200/70"
            >
              <div className="max-w-xl py-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs font-bold tracking-wider uppercase mb-6">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>02 / ПЛАТФОРМА</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
                  Шешім —{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Nexra
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                  Шешім — Nexra. Бұл нақты нарық деректеріне негізделген виртуалды
                  инвестициялық симулятор. Стек:{" "}
                  <span className="text-[#FF6B00] font-bold">
                    Next.js 14, Supabase, Tailwind, Marketaux API
                  </span>
                  . Негізгі модульдер: Виртуалды сауда, Портфель, Академия,
                  Жаңалықтар, Лидерборд.
                </p>

                {/* Негізгі модульдердің сипаттамасы */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Платформаның негізгі модульдері:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        title: "Виртуалды сауда",
                        desc: "Real-time бағалар мен ордерлер",
                        icon: BarChart3,
                        color: "text-[#FF6B00] bg-orange-50",
                      },
                      {
                        title: "Портфель",
                        desc: "Активтерді әртараптандыру",
                        icon: PieChart,
                        color: "text-amber-600 bg-amber-50",
                      },
                      {
                        title: "Академия",
                        desc: "Интерактивті қаржы сабақтары",
                        icon: BookOpen,
                        color: "text-blue-600 bg-blue-50",
                      },
                      {
                        title: "Жаңалықтар",
                        desc: "Marketaux API & AI Sentiment",
                        icon: Newspaper,
                        color: "text-emerald-600 bg-emerald-50",
                      },
                      {
                        title: "Лидерборд",
                        desc: "Геймификация және рейтинг",
                        icon: Award,
                        color: "text-purple-600 bg-purple-50",
                      },
                    ].map((mod, idx) => {
                      const Icon = mod.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className={`p-2 rounded-lg ${mod.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-sm font-bold text-slate-900 block">
                              {mod.title}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              {mod.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Техникалық стек белгілері */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                    Қолданылған заманауи технологиялар:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Next.js 14 App Router", icon: Globe },
                      { name: "Supabase DB & Auth", icon: Database },
                      { name: "Tailwind CSS", icon: Layers },
                      { name: "Marketaux Live API", icon: Radio },
                    ].map((tech, idx) => {
                      const TechIcon = tech.icon;
                      return (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 border border-slate-200 text-slate-700 font-medium"
                        >
                          <TechIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>{tech.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* КАРТОЧКА 3: ЭКСПЕРИМЕНТ ЖӘНЕ НӘТИЖЕ */}
            <div
              id="card-3"
              ref={card3Ref}
              className="min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16 border-b lg:border-b-0 border-slate-200/70"
            >
              <div className="max-w-xl py-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs font-bold tracking-wider uppercase mb-6">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>03 / ЭКСПЕРИМЕНТ ЖӘНЕ НӘТИЖЕ</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
                  6 апталық тәжірибе:{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    1.7 есе жоғары өсім
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                  Біз 6 апталық эксперимент өткіздік (20 оқушы). Бақылау тобы тек
                  теорияны оқыды, ал Nexra тобы платформада практикамен
                  айналысты. Нәтижесінде{" "}
                  <strong className="text-[#FF6B00] font-bold">
                    Nexra тобының білім өсімі 1.7 есе жоғары болды
                  </strong>{" "}
                  (+10 балл vs +6 балл).
                </p>

                {/* Топтарды салыстыру карточкалары */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-[#FF6B00] mb-1">
                      <span className="font-bold">NEXRA ТОБЫ</span>
                      <Zap className="w-4 h-4 text-[#FF6B00]" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900">
                      +10 <span className="text-lg font-normal text-slate-600">балл</span>
                    </div>
                    <div className="text-xs text-[#FF6B00] mt-1 font-bold">
                      9 балл → 19 балл (+111% өсім)
                    </div>
                    <div className="mt-3 text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Платформада тәжірибе</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span className="font-bold">БАҚЫЛАУ ТОБЫ</span>
                      <BookOpen className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-slate-900">
                      +6 <span className="text-lg font-normal text-slate-600">балл</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 font-medium">
                      9 балл → 15 балл (+67% өсім)
                    </div>
                    <div className="mt-3 text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>Тек классикалық оқулық</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    Ғылыми гипотеза толық дәлелденді: нақты нарық симуляторы
                    теориялық лекцияларға қарағанда қаржылық дағдыны әлдеқайда жылдам
                    әрі сапалы қалыптастырады.
                  </span>
                </div>
              </div>
            </div>

            {/* КАРТОЧКА 4: ҚОРЫТЫНДЫ */}
            <div
              id="card-4"
              ref={card4Ref}
              className="min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16"
            >
              <div className="max-w-xl py-12">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#FF6B00] text-xs font-bold tracking-wider uppercase mb-6">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>04 / ҚОРЫТЫНДЫ</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-slate-900 mb-6">
                  Мақсатыма жеттім:{" "}
                  <span className="bg-gradient-to-r from-[#FF6B00] via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    Жаңа инвесторлар буыны
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                  Мақсатыма жеттім: Nexra практикасы қосылғанда оқушылардың білім
                  өсімі айтарлықтай жоғары болды. Жоба жастарға ақшаны жұмсап қана
                  қоймай, оны басқаруды үйретеді.
                </p>

                {/* ФИНАЛЬНЫЙ ПАНЧЛАЙН (Крупно, оранжевый акцент #FF6B00) */}
                <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50/40 to-white border-2 border-orange-300 shadow-[0_10px_35px_rgba(255,107,0,0.12)] overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Flame className="w-24 h-24 text-[#FF6B00]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-mono text-[#FF6B00] font-bold block mb-2">
                    — БАСТЫ ТҰЖЫРЫМ / PUNCHLINE
                  </span>
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-slate-900 drop-shadow-sm">
                    «Мен осы компанияның{" "}
                    <span className="text-[#FF6B00] underline decoration-[#FF6B00] underline-offset-6">
                      клиентімін бе
                    </span>
                    , әлде{" "}
                    <span className="text-[#FF6B00] underline decoration-[#FF6B00] underline-offset-6">
                      иесімін бе?
                    </span>
                    »
                  </blockquote>
                </div>

                {/* Автор карточкасы */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B00] flex items-center justify-center font-bold text-white text-lg shadow-md shadow-orange-500/20">
                      ЕА
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Еркін Ақзейнеп
                      </h4>
                      <p className="text-xs text-slate-500">
                        11-сынып оқушысы • Ғылыми жоба авторы
                      </p>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-mono text-[#FF6B00] font-bold block">
                      НӘТИЖЕ: СӘТТІ
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      2026/2027 оқу жылы
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ҒЫЛЫМИ ЖОБАНЫҢ ТӨЛҚҰЖАТЫ (Light Mode Jury Section)
          ========================================================================= */}
      <section className="relative border-t border-slate-200 bg-slate-100/70 py-20 px-6 sm:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF6B00] font-bold block mb-2">
              ҒЫЛЫМИ-ПРАКТИКАЛЫҚ ҚҰЖАТТАМА
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Жобаның төлқұжаты
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Ғылыми жетекшілер мен қазылар алқасына арналған негізгі деректер
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-mono text-[#FF6B00] font-bold block mb-1">
                01. ТАҚЫРЫП
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Nexra қаржы симуляторы
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Жасөспірімдердің қаржылық сауаттылығын тәжірибелік симуляция арқылы
                арттыру.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-mono text-amber-600 font-bold block mb-1">
                02. ҒЫЛЫМИ ЖАҢАЛЫҚ
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                Реал-тайм нарық модельдеуі
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Шынайы биржалық API және жасанды интеллект жаңалықтарымен
                байланыстырылған отандық алғашқы білім платформасы.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <span className="text-xs font-mono text-emerald-600 font-bold block mb-1">
                03. ПРАКТИКАЛЫҚ НӘТИЖЕ
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-2">
                +1.7 есе білім артықшылығы
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                6 апталық бақылау сынағында дәстүрлі оқытуға қарағанда 1.7 есе
                жоғары нәтиже тіркелді (+10 vs +6 балл).
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Ғылыми қорғауға дайынсыз ба?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Презентацияны басынан бастап қайта көру немесе сұрақ-жауапқа көшу
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition-colors cursor-pointer shadow-sm"
              >
                Басына оралу ↑
              </button>
              <button
                onClick={() => scrollToSlide(1)}
                className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#FF6B00] hover:bg-[#e66000] text-white shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                Платформаны көру
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <span>© 2026 Nexra — Автор: Еркін Ақзейнеп, 11-сынып</span>
          <span>Қаржылық сауаттылықты дамыту жөніндегі ғылыми-зерттеу жобасы</span>
        </div>
      </section>
    </main>
  );
}

// =============================================================================
// МЕДИА-БЛОК 1: ІЛГЕК ЖӘНЕ МӘСЕЛЕ (Light Mode)
// =============================================================================
function MediaCard1Problem() {
  return (
    <div className="w-full flex flex-col gap-3 py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Карточка А: Тұтыну (iPhone) */}
        <div className="relative p-4 rounded-2xl bg-slate-50 border border-rose-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">
                ТҰТЫНУ
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Жаңа iPhone 16 Pro</h4>
            <p className="text-xs text-slate-500 mt-1">Бастапқы құны: ~650 000 ₸</p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">2 жылдағы құны:</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
              <TrendingDown className="w-3.5 h-3.5" />
              -40% құнсыздану
            </span>
          </div>
        </div>

        {/* Карточка Б: Инвестиция (Apple Inc Акциясы) */}
        <div className="relative p-4 rounded-2xl bg-orange-50/60 border border-orange-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-[#FF6B00]">
                <Coins className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold">
                ИНВЕСТИЦИЯ
              </span>
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Apple (AAPL) акциясы</h4>
            <p className="text-xs text-slate-500 mt-1">Сол сомаға акция сатып алу</p>
          </div>

          <div className="mt-4 pt-3 border-t border-orange-200/60 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">5 жылдағы нәтиже:</span>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5" />
              +312% капитал
            </span>
          </div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-100 text-amber-700">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <span className="text-slate-700 font-medium">PISA 2022 дабылы:</span>
        </div>
        <span className="font-mono text-[#FF6B00] font-bold">
          ~1/5 оқушы ең төменгі деңгейде
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// МЕДИА-БЛОК 2: ПЛАТФОРМА (Light Mode Мокап Браузера + <video> тегі)
// =============================================================================
function MediaCard2Platform() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
        {/* Браузердің жоғарғы басқару панелі (Light Toolbar) */}
        <div className="px-3 py-2 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          </div>

          <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600 max-w-[240px] truncate shadow-xs">
            <Lock className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span className="truncate">nexora.finance/trade</span>
          </div>

          <div className="w-8" />
        </div>

        {/* Браузер ішіндегі видео тег-плейсхолдер */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-b-xl bg-slate-900"
            src="/demo.mp4"
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// МЕДИА-БЛОК 3: ЭКСПЕРИМЕНТ (Recharts BarChart — Light Mode адаптациясы)
// Сұр сетка, бейтарап бақылау тобы (#94a3b8) және жарқын сарғыш (#FF6B00)
// =============================================================================
interface MediaCard3ChartProps {
  isMounted: boolean;
}

function MediaCard3Chart({ isMounted }: MediaCard3ChartProps) {
  if (!isMounted) {
    return (
      <div className="w-full h-64 flex items-center justify-center text-xs text-slate-400">
        График жүктелуде...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-[#FF6B00]" />
          <span className="text-slate-900 font-bold">
            Nexra тобы (+10 балл)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-sm bg-slate-400" />
          <span className="text-slate-500 font-medium">Бақылау тобы (+6 балл)</span>
        </div>
      </div>

      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={experimentData}
            margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
          >
            <defs>
              {/* Nexra тобына арналған жарқын сарғыш градиент (#FF6B00) */}
              <linearGradient id="nexraLightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B00" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              {/* Бақылау тобына арналған бейтарап сұр градиент */}
              <linearGradient id="controlLightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="shortName"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <YAxis
              domain={[0, 20]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#cbd5e1" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-xl text-xs">
                      <p className="font-bold text-slate-900 mb-1.5">
                        {payload[0]?.payload?.stage}
                      </p>
                      <div className="flex items-center justify-between gap-4 text-[#FF6B00] font-bold">
                        <span>Nexra тобы:</span>
                        <span>{payload[1]?.value} балл</span>
                      </div>
                      <div className="flex items-center justify-between gap-4 text-slate-500 font-medium">
                        <span>Бақылау тобы:</span>
                        <span>{payload[0]?.value} балл</span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey="control"
              name="Бақылау тобы"
              fill="url(#controlLightGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1200}
            />
            <Bar
              dataKey="nexra"
              name="Nexra тобы"
              fill="url(#nexraLightGradient)"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 p-2.5 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">Өсім көрсеткіші:</span>
        <span className="font-mono text-[#FF6B00] font-bold">
          Nexra тобы 1.7 есе жоғары өсім көрсетті
        </span>
      </div>
    </div>
  );
}

// =============================================================================
// МЕДИА-БЛОК 4: ҚОРЫТЫНДЫ (Light Mode Trophy, Target, Rocket)
// =============================================================================
function MediaCard4Conclusion() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 relative">
      <div className="absolute w-44 h-44 rounded-full bg-orange-100/70 blur-2xl pointer-events-none" />

      {/* Орталық кубок */}
      <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#FF6B00] via-amber-400 to-yellow-300 p-0.5 shadow-[0_10px_35px_rgba(255,107,0,0.25)] mb-4">
        <div className="w-full h-full rounded-[22px] bg-white flex items-center justify-center">
          <Trophy className="w-12 h-12 text-[#FF6B00] drop-shadow-[0_2px_10px_rgba(255,107,0,0.3)]" />
        </div>
      </div>

      {/* Target және Rocket орбиталық карточкалары */}
      <div className="w-full grid grid-cols-2 gap-3 z-10 mt-2">
        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Мақсатқа жетті
            </span>
            <span className="text-[10px] text-slate-500 block">
              100% дәлелденді
            </span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6B00] flex-shrink-0">
            <Rocket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Қолданысқа дайын
            </span>
            <span className="text-[10px] text-slate-500 block">
              Мектеп бағдарламасы
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 w-full p-2.5 rounded-xl bg-orange-50 border border-orange-200 text-center text-xs font-mono font-bold text-[#FF6B00]">
        «Тұтынушы емес — Қаржы қожайыны»
      </div>
    </div>
  );
}
