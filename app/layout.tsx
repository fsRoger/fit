import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'NutriMass – Ganho de Massa Inteligente',
  description: 'App completo de nutrição para ganho de massa magra com receitas baratas, controle de mantimentos, lista de mercado e gráficos de progresso.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💪</text></svg>',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
