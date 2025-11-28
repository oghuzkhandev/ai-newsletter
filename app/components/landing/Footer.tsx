"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Mail, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-stone-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/30 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[100px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(120 113 108) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="py-20">
          {/* BRAND & NEWSLETTER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16 pb-16 border-b border-stone-200"
          >
            {/* Brand */}
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-amber-400 flex items-center justify-center shadow-lg shadow-rose-200/50">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-stone-800">
                  {t("brand.name")}
                </h2>
              </div>
              <p className="text-stone-500 leading-relaxed">
                {t("brand.description")}
              </p>
            </div>

            {/* Newsletter Box */}
            <div className="flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border border-stone-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-stone-100 flex items-center justify-center">
                <Mail className="w-6 h-6 text-stone-600" />
              </div>
              <div>
                <p className="font-medium text-stone-800">{t("newsletter.title")}</p>
                <p className="text-sm text-stone-500">{t("newsletter.subtitle")}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-4 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-colors"
              >
                {t("newsletter.button")}
              </motion.button>
            </div>
          </motion.div>

          {/* LINKS GRID */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-20"
          >
            <FooterColumn
              title={t("columns.product.title")}
              links={t.raw("columns.product.links")}
            />
            <FooterColumn
              title={t("columns.resources.title")}
              links={t.raw("columns.resources.links")}
            />
            <FooterColumn
              title={t("columns.company.title")}
              links={t.raw("columns.company.links")}
            />
            <FooterColumn
              title={t("columns.legal.title")}
              links={t.raw("columns.legal.links")}
            />
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="py-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-stone-500">
            © {currentYear} GlobeBrief. {t("bottom.crafted")}
          </p>

          <div className="flex items-center gap-2">
            <SocialIcon icon={Github} href="https://github.com/oghuzkhandev" label="GitHub" />
            <SocialIcon icon={Mail} href="mailto:oguzhandogandev@hotmail.com" label="Email" />
            <SocialIcon icon={Globe} href="https://oguzhandogan.com" label="Website" />
          </div>

          <p className="text-sm text-stone-500 flex items-center gap-1">
            {t("bottom.designedBy")}{" "}
            <a
              href="https://oguzhandogan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-stone-700 hover:text-rose-500 transition-colors"
            >
              OghuzKhan
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

function SocialIcon({ icon: Icon, href, label }: { icon: IconType; href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="group relative w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:border-stone-300 transition-all"
      aria-label={label}
    >
      <Icon className="w-4 h-4 text-stone-500 group-hover:text-stone-800 transition-colors" />
    </motion.a>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; badge?: string }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-stone-800 mb-5 text-sm uppercase tracking-wider">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={link.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={link.href}
              className="group flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors"
            >
              <span className="relative">
                {link.label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-rose-400 group-hover:w-full transition-all duration-300" />
              </span>
              {link.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-rose-100 text-rose-600 rounded-md">
                  {link.badge}
                </span>
              )}
              <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
