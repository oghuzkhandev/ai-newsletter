"use client"

import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Globe2, BrainCircuit, SendHorizonal } from "lucide-react"

export default function HowItWorksSection() {
  return (
    <section className="relative bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-[#0A0A0F] dark:via-[#12121A] dark:to-[#0A0A0F] py-20 sm:py-28 lg:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-20 text-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Nasıl Çalışır</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            <span className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-50 dark:via-slate-200 dark:to-slate-50 bg-clip-text text-transparent">
              Yüzlerce RSS kaynağından
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
              tek bir temiz bültene
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
            Siz kaynak zevkinizi getirin. Sistem AI destekli kürasyon, özetleme ve yapılandırma getiriyor. Sonuç:
            Hayatınıza gerçekten uyan günlük veya haftalık bir özet.
          </p>
        </motion.div>

        <Tabs defaultValue="sources" className="w-full space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-2xl p-1.5 shadow-lg backdrop-blur-sm">
            <TabsTrigger
              value="sources"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl text-sm font-medium transition-all duration-300"
            >
              Kaynak Seçimi
            </TabsTrigger>
            <TabsTrigger
              value="curate"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl text-sm font-medium transition-all duration-300"
            >
              AI Kürasyon
            </TabsTrigger>
            <TabsTrigger
              value="send"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl text-sm font-medium transition-all duration-300"
            >
              İnceleme & Gönderim
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sources">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="flex flex-row items-start gap-4 relative z-10">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                    <Globe2 className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                      Kategoriler ve favori sitelerinizi seçin
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      Neyi önemsediğinizi seçerek başlayın: bilim, teknoloji, kültür, spor, ekonomi, iş dünyası, yaşam
                      tarzı ve daha fazlası – tümü küratörlü Türkçe RSS beslemelerinden.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300 relative z-10">
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
                    <p className="flex-1">
                      Bilim, Teknoloji, Eğlence, Kültür & Sanat, Gündem, Finans gibi kategorileri açıp kapatın.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
                    <p className="flex-1">
                      Her kategoride belirli siteleri takip edin (örn. Evrim Ağacı, Webrazzi, T24, NTV Spor, Forbes
                      Türkiye...).
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-indigo-500 to-violet-500"></div>
                    <p className="flex-1">
                      Bazı kaynakları "mutlaka dahil et", diğerlerini "düşük öncelik" olarak işaretleyin, böylece özet
                      beklediğiniz gibi davransın.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="curate">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="flex flex-row items-start gap-4 relative z-10">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                      AI'nın filtrelemesine, gruplandırmasına ve özetlemesine izin verin
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      Motor sürekli olarak RSS kaynaklarınızdan yeni öğeler çeker, yineleri kaldırır, gürültüyü azaltır
                      ve uzun makaleleri temiz özetlere dönüştürür.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300 relative z-10">
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-500"></div>
                    <p className="flex-1">
                      Tüm seçili beslemelerden en son içeriği alın ve benzer hikayeleri bir araya getirin.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-500"></div>
                    <p className="flex-1">
                      Tıklama tuzağı veya düşük kaliteli öğeleri tespit edin ve bunları özetinizin en altına itin (veya
                      tamamen düşürün).
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-violet-500 to-purple-500"></div>
                    <p className="flex-1">
                      Her hikaye için kısa Türkçe özetler, önemli noktalar ve önerilen başlıklar oluşturun.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="send">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="border-slate-200/80 dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 shadow-xl backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="flex flex-row items-start gap-4 relative z-10">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                    <SendHorizonal className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                      İnceleyin, stillendirin ve özetinizi gönderin
                    </CardTitle>
                    <CardDescription className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      Hızlı düzenlemeler yapın, bölümleri yeniden sıralayın ve son özeti gelen kutunuza gönderin veya
                      tekrarlayan bir bülten olarak e-posta platformunuzla senkronize edin.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 pb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300 relative z-10">
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600"></div>
                    <p className="flex-1">
                      "Öne Çıkanlar", "Bilim & Teknoloji", "Kültür", "Piyasalar", "Spor" gibi bölümleri yeniden
                      sıralayın.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600"></div>
                    <p className="flex-1">
                      AI tarafından oluşturulan metni ince ayarlayın: tonu ayarlayın, yorum ekleyin veya önemli
                      hikayeleri en üste sabitleyin.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1 rounded-full bg-gradient-to-b from-emerald-500 to-teal-600"></div>
                    <p className="flex-1">
                      Günlük veya haftalık gönderim planlayın veya mevcut e-posta aracınızda kullanmak için HTML dışa
                      aktarın.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
