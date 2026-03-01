'use client'

import { useState } from 'react'
import { Trash2, Flame, Dumbbell, Wheat, Droplets } from 'lucide-react'
import { MealLog, MACRO_GOAL } from '@/lib/data'
import { today } from '@/lib/hooks'
import ProgressBar from '@/components/ui/ProgressBar'

interface Props {
  log: MealLog
  setLog: (val: MealLog | ((prev: MealLog) => MealLog)) => void
}

const MACRO_CONFIG = [
  { key: 'calories' as const, label: 'Calorias', unit: 'kcal', color: '#f59e0b', goal: MACRO_GOAL.calories, Icon: Flame },
  { key: 'protein' as const, label: 'Proteína', unit: 'g', color: '#3b82f6', goal: MACRO_GOAL.protein, Icon: Dumbbell },
  { key: 'carbs' as const, label: 'Carboidratos', unit: 'g', color: '#10b981', goal: MACRO_GOAL.carbs, Icon: Wheat },
  { key: 'fat' as const, label: 'Gordura', unit: 'g', color: '#a78bfa', goal: MACRO_GOAL.fat, Icon: Droplets },
]

export default function DiaryTab({ log, setLog }: Props) {
  const [date, setDate] = useState(today())

  const meals = log[date] || []

  const totals = meals.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const remove = (idx: number) => {
    setLog((prev) => {
      const updated = [...(prev[date] || [])]
      updated.splice(idx, 1)
      return { ...prev, [date]: updated }
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Diário Alimentar</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 transition-colors"
        />
      </div>

      {/* Macro totals */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MACRO_CONFIG.map(({ key, label, unit, color, goal, Icon }) => {
          const value = totals[key]
          const pct = Math.min(100, Math.round((value / goal) * 100))
          return (
            <div key={key} className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{label}</span>
                <Icon size={14} style={{ color }} />
              </div>
              <div className="text-xl font-bold text-white">
                {value}
                <span className="text-xs text-gray-500 ml-1">{unit}</span>
              </div>
              <ProgressBar value={value} max={goal} color={color} />
              <div className="text-xs text-gray-500">{pct}% da meta</div>
            </div>
          )
        })}
      </div>

      {/* Meta reference */}
      <div className="bg-gray-800/40 border border-gray-700/50 rounded-xl px-4 py-2 flex flex-wrap gap-3 text-xs text-gray-500">
        <span>Metas diárias:</span>
        {MACRO_CONFIG.map(({ label, goal, unit }) => (
          <span key={label}>
            <span className="text-gray-400">{label}:</span> {goal}{unit}
          </span>
        ))}
      </div>

      {/* Meals list */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Refeições do dia</h3>
        {meals.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p>Nenhuma refeição registrada.</p>
            <p className="text-xs mt-1">Use a aba Receitas para registrar refeições!</p>
          </div>
        )}
        {meals.map((m, i) => (
          <div
            key={i}
            className="bg-gray-800/60 border border-gray-700 rounded-xl p-4 flex items-center gap-3"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">{m.name}</div>
              <div className="flex gap-2 mt-1 flex-wrap">
                <span className="text-xs text-amber-400">{m.calories} kcal</span>
                <span className="text-xs text-blue-400">{m.protein}g prot</span>
                <span className="text-xs text-emerald-400">{m.carbs}g carb</span>
                <span className="text-xs text-purple-400">{m.fat}g gord</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 flex-shrink-0">{m.time}</span>
            <button onClick={() => remove(i)} className="text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
