import { Pizza } from 'lucide-react'
import { MotionDiv, MotionH3 } from '../common/motion-warpper'
import { SummaryViewer } from '../summaries/summary-viewer'

const DEMO_SUMMARY = {
  title: 'Next.js Course',
  summary: `

# Visão Geral
• 🎯 Curso abrangente Next.js 15, abrangendo desde fundamentos até estratégias avançadas de implantação.
• 📌 Domine o Next.js e crie aplicativos web incríveis. Perfeito para desenvolvedores de todos os níveis.


# Detalhes do Documento
• 📄 Tipo: Curso Online
• 👥 Para: Desenvolvedores Web, Entusiastas de JavaScript, Iniciantes e Especialistas em Next.js


# Destaques Principais
• 🚀 Aprenda Server-Side Rendering (SSR) e Static Site Generation (SSG)
• ⭐ Mergulhe fundo nos recursos do Next.js, como rotas de API e otimização de imagens
• 💫 Crie projetos do mundo real e aumente seu portfólio


# Por que Isso Importa
💡 Next.js é uma estrutura poderosa que simplifica o desenvolvimento web e melhora o desempenho, tornando você um dos profissionais mais procurados do mercado


# Pontos Principais
• 🎯 Obtenha uma sólida compreensão dos principais conceitos do Next.js
• 💪 Crie um aplicativo web rápido, mais eficiente e otimizado para SEO
• 🔥 Melhore seu marketing como desenvolvedor Front-End ou Full-Stack


# Dicas Adicionais
• ⭐ Pratique com construção de projetos para solidificar seu aprendizado
• 💎 Explore a documentação do Next.js para recursos avançados
• 🌟 Junte-se à comunidade Next.js para obter suporte e networking


# Termos-Chave
• 📚 SSR (Server-Side Rendering): Renderização de páginas no servidor para melhorar SEO e performance
• 🔍 SSG (Static Site Generation): Gerando arquivos HTML estáticos em tempo de execução para carregamento extremamente rápido


# Resumo Final
💫 Invista no seu futuro e torne-se um profissional em Next.js!
  `,
}

export default function DemoSection() {
  return (
    <section className="relative">
      <div
        className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 
        lg:px-8 lg:pt-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu 
        overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 
                    w-[36.125rem] -translate-x-1/2 bg-linear-to-br 
                    from-emerald-500 via-teal-500 to-cyan-500 opacity-30 
                    sm:left-[cal(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%',
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="inline-flex items-center justify-center p-2 
          rounded-2xl bg-gray-100/80 backdrop-blur-xs border 
          border-gray-500/20 mb-4"
          >
            <Pizza className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              Veja como o Resumai transforma esse{' '}
              <span
                className="bg-linear-to-r from-rose-500 to-rose-700 
            bg-clip-text text-transparent"
              >
                PDF do curso Next.js
              </span>{' '}
              em um resumo fácil de ler!
            </MotionH3>
          </div>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={DEMO_SUMMARY.summary} />
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
