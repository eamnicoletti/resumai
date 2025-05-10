import { isDev } from './helpers'

// prettier-ignore
type priceType ={
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
}

// prettier-ignore
export const pricingPlans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 9,
    description: 'Perfeito para uso ocasional',
    paymentLink: isDev ? 'https://buy.stripe.com/test_28E7sN1Dcaxp80c3IGbEA01' : 'https://buy.stripe.com/5kAdRR4Yd47DerKaEE',
    priceId: isDev ? 'price_1RN1TAQC4A0qfDVtYsitAytm' : 'price_1RN0n2GLdnGOYP0p6ibzTot1',
    items: [
      '5 resumos por mês',
      'Velocidade de processamento regular',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    description: 'Para profissionais e times',
    paymentLink: isDev ? 'https://buy.stripe.com/test_7sY6oJ0z8gVNbco3IGbEA00' : 'https://buy.stripe.com/aEU3ddeyN7jP0AUeUV',
    priceId: isDev ? 'price_1RN1TAQC4A0qfDVt6s92ya6y' : 'price_1RN0n2GLdnGOYP0pKEFqr7uM',
    items: [
      'Resumos ilimitados',
      'Processamento prioritário',
      'Suporte 24/7',
      'Exportação de Markdown',
    ],
  },
]

// utils/constants.ts
// prettier-ignore
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// prettier-ignore
export const itemVariants = {
  hidden: { opacity: 0, y: 20},
  visible: {
    opacity: 1,    
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
// // prettier-ignore
// export const buttonVariants = {
//   hidden: { opacity: 0, scale: 0.5, rotate: -10 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     rotate: 0,
//     transition: {
//       type: "spring",
//       stiffness: 300,
//       damping: 15,
//       delay: 0.5,
//     },
//   },
//   hover: {
//     scale: 1.05,
//     rotate: 2,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 10,
//     },
//   },
//   tap: {
//     scale: 0.95,
//     rotate: -2,
//   },
// };

// prettier-ignore
export const viewerVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};
