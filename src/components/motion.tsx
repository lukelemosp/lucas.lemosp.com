import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

/* Apple-style curves */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN = [0.42, 0, 1, 1] as const;

/* Springs com pouco overshoot (tom sutil/corporativo). */
export const SPRING_SNAPPY = { type: 'spring', stiffness: 420, damping: 38, mass: 0.9 } as const;
export const SPRING_SMOOTH = { type: 'spring', stiffness: 260, damping: 34 } as const;

/** Feedback de toque/hover para botões (spread em um motion.*). */
export const press = {
  whileTap: { scale: 0.97 },
  whileHover: { y: -1 },
  transition: SPRING_SNAPPY,
};

const viewVariants: Variants = {
  initial: { opacity: 0, filter: 'blur(4px)' },
  enter: {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: 0.38, ease: EASE_OUT, when: 'beforeChildren', staggerChildren: 0.055, delayChildren: 0.02 },
  },
  exit: { opacity: 0, y: -6, scale: 0.985, filter: 'blur(6px)', transition: { duration: 0.2, ease: EASE_IN } },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 14, scale: 0.985 },
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.56, ease: EASE_OUT } },
};

/** A routed page. Mount it inside <AnimatePresence mode="wait">. */
export function View({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.section className="view" aria-label={label}
      variants={viewVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.section>
  );
}

/** Staggered child of a View (or of another Stagger group). */
export const Anim = motion.div;
export const AnimArticle = motion.article;
export const AnimLi = motion.li;
export const AnimNav = motion.nav;
export const item = { variants: itemVariants };

/** Groups that stagger their own children (e.g. a list inside a card). */
export const groupVariants: Variants = {
  initial: {},
  enter: { transition: { staggerChildren: 0.05 } },
};
