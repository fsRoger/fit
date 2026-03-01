'use client'

import { Dumbbell, CheckSquare, ShoppingCart, Package, BookOpen, Calendar, BarChart2 } from 'lucide-react'

export type TabId = 'tasks' | 'shopping' | 'pantry' | 'recipes' | 'diary' | 'charts'

export const TABS: { id: TabId; label: string; Icon: React.ElementType }[] = [
  { id: 'tasks', label: 'Tarefas', Icon: CheckSquare },
  { id: 'shopping', label: 'Mercado', Icon: ShoppingCart },
  { id: 'pantry', label: 'Mantimentos', Icon: Package },
  { id: 'recipes', label: 'Receitas', Icon: BookOpen },
  { id: 'diary', label: 'Diário', Icon: Calendar },
  { id: 'charts', label: 'Gráficos', Icon: BarChart2 },
]

interface Props {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  badges: Partial<Record<TabId, number>>
  todayMeals: number
  lowStock: number
}

export default function Header({ activeTab, onTabChange, badges, todayMeals, lowStock }: Props) {
  return (
    <div className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-xl border-b border-gray-800/60">
      <div className="max-w-4xl mx-auto px-4">
        {/* Brand row */}
        <div className="flex items-center gap-3 py-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
            <Dumbbell size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-none">NutriMass</h1>
            <p className="text-xs text-gray-500 leading-none mt-0.5">Ganho de massa inteligente</p>
          </div>
          <div className="ml-auto flex gap-2 text-xs text-gray-500">
            {todayMeals > 0 && (
              <span className="bg-teal-900/40 text-teal-400 px-2 py-0.5 rounded-full">
                {todayMeals} refeições hoje
              </span>
            )}
            {lowStock > 0 && (
              <span className="bg-red-900/40 text-red-400 px-2 py-0.5 rounded-full">
                {lowStock} estoque baixo
              </span>
            )}
          </div>
        </div>

        {/* Tab nav */}
        <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {TABS.map(({ id, label, Icon }) => {
            const badge = badges[id] || 0
            return (
              <button
                key={id}
                onClick={() => onTabChange(id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  activeTab === id
                    ? 'bg-teal-600/20 text-teal-400'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                <Icon size={14} />
                {label}
                {badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
