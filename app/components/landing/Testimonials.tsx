"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { motion } from "framer-motion"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Bu platform sayesinde küresel futbol güncellemelerini zahmetsizce takip edebiliyorum. Beni bilgili, odaklı tutuyor ve her gün değerli zamanımdan tasarruf ediyor.",
      name: "Cristiano Ronaldo",
      designation: "Al Nassr Futbolcusu",
      src: "/CR7.jpg",
    },
    {
      quote:
        "Bu araç, her önemli teknoloji güncellemesinin başında olmamı sağlıyor. Temiz, hızlı, AI destekli — geleceği inşa etmeye devam etmek için tam olarak ihtiyacım olan şey.",
      name: "Elon Musk",
      designation: "SpaceX & Tesla CEO'su",
      src: "/ElonMusk.jpg",
    },
    {
      quote:
        "Bu platform sayesinde dünya gelişmelerini anında takip ediyorum. İş, siyaset, ekonomi — artık hiçbir şey elimden kaçmıyor.",
      name: "Donald Trump",
      designation: "Amerika Birleşik Devletleri 45. Başkanı",
      src: "/Trump.avif",
    },
    {
      quote:
        "Medya trendleri, eğlence haberleri, küresel kültür — her şey temiz, hızlı AI özetlerinde bana sunuluyor. Bilgili kalmayı zahmetsiz hale getiriyor.",
      name: "Brad Pitt",
      designation: "Aktör & Yapımcı",
      src: "/Brad Pitt.webp",
    },
  ]

  return (
    <section className="relative py-32 lg:py-40 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-[#0A0A0F] dark:via-[#12121A] dark:to-[#0A0A0F] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-indigo-200/50 dark:border-indigo-800/50 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 backdrop-blur-sm shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Kullanıcı Yorumları</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-50 dark:via-slate-200 dark:to-slate-50 bg-clip-text text-transparent">
              Kullanıcılarımız
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              ne diyor?
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-pretty">
            Dünya çapında liderler ve profesyoneller platformumuzu kullanarak bilgili kalıyor ve zamandan tasarruf
            ediyor.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedTestimonials testimonials={testimonials} />
        </motion.div>
      </div>
    </section>
  )
}
