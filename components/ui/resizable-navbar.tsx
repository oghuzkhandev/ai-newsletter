"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useRef, useState } from "react";

/* === NAVBAR WRAPPER === */
export const Navbar = ({ children, className }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 80));

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-6 z-40 w-full", className)}
    >
      {React.Children.map(children, (child: any) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { visible })
          : child
      )}
    </motion.div>
  );
};

/* === DESKTOP BODY === */
export const NavBody = ({ children, className, visible }: any) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible
          ? "0 8px 28px rgba(130,155,255,0.25)"
          : "none",
        width: visible ? "42%" : "100%",
        y: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 38 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between rounded-full bg-transparent px-4 py-3 lg:flex",
        visible && "bg-white/85 border border-blue-200/40 shadow-sm",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/* === DESKTOP NAV ITEMS === */
export const NavItems = ({ items, className, onItemClick }: any) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 items-center justify-center space-x-2 text-sm font-medium text-blue-700 lg:flex",
        className
      )}
    >
      {items.map((item: any, idx: number) => (
        <a
          key={idx}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="relative px-4 py-2 font-bold text-blue-700"
        >
          {hovered === idx && (
            <motion.div
              layoutId="underline-glow"
              className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full bg-blue-400 shadow-[0_0_12px_3px_rgba(56,132,245,0.55)]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

/* === MOBILE NAV CONTAINER === */
export const MobileNav = ({ children, className, visible }: any) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(14px)" : "none",
        width: visible ? "92%" : "100%",
        borderRadius: visible ? "1rem" : "2rem",
        y: visible ? 14 : 0,
      }}
      transition={{ type: "spring", stiffness: 180, damping: 36 }}
      className={cn(
        "mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-white/75 px-0 py-2 shadow-sm lg:hidden border border-blue-100",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/* === MOBILE HEADER === */
export const MobileNavHeader = ({ children, className }: any) => (
  <div className={cn("flex w-full items-center justify-between", className)}>
    {children}
  </div>
);

/* === MOBILE MENU === */
export const MobileNavMenu = ({ children, className, isOpen }: any) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className={cn(
          "absolute top-16 inset-x-0 flex w-full flex-col gap-4 rounded-xl bg-white px-4 py-8 shadow-xl border border-blue-100",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

/* === MOBILE TOGGLE === */
export const MobileNavToggle = ({ isOpen, onClick }: any) =>
  isOpen ? (
    <IconX className="text-blue-700" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-blue-700" onClick={onClick} />
  );

/* === LOGO === */
export const NavbarLogo = () => (
  <a href="/" className="flex items-center space-x-2 px-2 py-1 text-blue-700">
    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center text-white font-bold">
      AI
    </div>
    <span className="font-semibold">Newsletter</span>
  </a>
);

/* === BUTTON === */
export const NavbarButton = ({
  children,
  className,
  variant = "primary",
  as: Tag = "a",
  href,
  ...props
}: any) => {
  const base =
    "px-4 py-2 rounded-md text-sm font-semibold transition duration-200 active:scale-[0.98]";

  const variants: any = {
    primary:
      "bg-white text-blue-700 border border-blue-200 shadow-[0_6px_14px_rgba(120,150,255,0.22)] hover:bg-blue-50",
    secondary:
      "bg-transparent text-blue-700 hover:bg-blue-100/40",
    dark:
      "bg-blue-600 text-white shadow-md hover:bg-blue-700",
    gradient:
      "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md hover:opacity-90",
  };

  return (
    <Tag
      href={href}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
