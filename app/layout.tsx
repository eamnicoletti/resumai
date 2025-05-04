import Footer from '@/components/common/footer'
import Header from '@/components/common/header'
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
  title: 'Resumai - Resumo em PDF com tecnologia de IA',
  description: 'Resumai é uma poderosa plataforma de resumir documentos em PDF',
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
            <Footer />
          </div>
          <Toaster position="top-right" richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
