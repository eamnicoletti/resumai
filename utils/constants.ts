import { isDev } from './helpers'

export const pricingPlans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 9,
    description: 'Perfeito para uso ocasional',
    paymentLink: isDev ? 'https://buy.stripe.com/test_dR67t7aTvaiyc2AaEE' : '',
    priceId: isDev ? 'price_1RM8RPQczykkG8iR9Gzhd3Jm' : '',
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
    paymentLink: isDev ? 'https://buy.stripe.com/test_aEU7t7bXz9eu2s0eUV' : '',
    priceId: isDev ? 'price_1RM8SPQczykkG8iR3bILDc8T' : '',
    items: [
      'Resumos ilimitados',
      'Processamento prioritário',
      'Suporte 24/7',
      'Exportação de Markdown',
    ],
  },
]
