import Header from '@/components/common/header'
import { ORIGIN_URL } from '@/utils/helpers'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Source_Sans_3 as FontSans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const fontSans = FontSans({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Resumai - Resumo de PDFs com tecnologia de IA',
  description:
    'Salve horas de tempo de leitura. Transforme PDFs extensos em resumos claros e estruturados em segundos com nossa tecnologia de IA poderosa.',
  openGraph: {
    images: [
      {
        url: '/opengraph-image.png',
      },
    ],
  },
  metadataBase: new URL(ORIGIN_URL),
  alternates: {
    canonical: ORIGIN_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="pt_br" suppressHydrationWarning={true}>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
